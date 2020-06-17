node {
    def registry = '58910810/capstone_cloud_devops'
    stage('Checking out git repo') {
      echo 'Checkout...'
      checkout scm
    }
    stage('Checking environment') {
      echo 'Checking environment...'
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
    }
    
    stage('Building image') {
        echo 'Building Docker image...'
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
	     	sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD "
	     	sh "docker build -t ${registry} ."
	     	sh "docker tag ${registry} ${registry}"
	     	sh "docker push ${registry}"
      }
    }

    stage("Linting") {
      echo 'Linting...'
      sh 'tidy -q -e *.html'
    }

    stage('Deploying') {
      echo 'Deploying to AWS...'
      dir ('./') {
        withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
            sh "aws eks --region us-east-2 update-kubeconfig --name MyCapstoneEKS"
            sh "kubectl apply -f aws/aws-auth-cm.yaml"
            sh "kubectl apply -f aws/capstone-app-deployment.yml"
            sh "kubectl set image deployments/capstone-app capstone-app=${registry}:latest"
            sh "kubectl get nodes"
            sh "kubectl get pods"
            sh "./aws/create_worker_nodes.sh"
            sh "aws cloudformation update-stack --stack-name udacity-capstone-nodes --template-body file://aws/worker_nodes.yml --parameters file://aws/worker_nodes_parameters.json --capabilities CAPABILITY_IAM"
        }
      }
    }
    stage("Cleaning up") {
      echo 'Cleaning up...'
      sh "docker system prune"
    }
}
