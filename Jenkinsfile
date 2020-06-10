node {
    def registry = 'rihanna/udacity-capstone-project'
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
    stage("Linting") {
      echo 'Linting...'
      
    }
    stage('Building image') {
	    echo 'Building Docker image...'
        echo "usern name: ${env.dockerhubUser}"
      withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'rihannadocker', usernameVariable: 'Android85')]) {
	     	sh "docker login -u ${env.dockerhubUser} -p ${env.dockerhubPassword}"
	     	sh "docker build -t ${registry} ."
	     	sh "docker tag ${registry} ${registry}"
	     	sh "docker push ${registry}"
      }
    }
    stage('Deploying') {
      echo 'Deploying to AWS...'
      dir ('./') {
        withAWS(credentials: 'aws-credentials', region: 'us-east-2') {
            sh "aws eks --region us-east-2 update-kubeconfig --name CapstoneEKS"
            sh "kubectl apply -f aws/aws-auth-cm.yaml"
            sh "kubectl set image deployments/capstone-app capstone-app=${registry}:latest"
            sh "kubectl apply -f aws/capstone-app-deployment.yml"
            sh "kubectl get nodes"
            sh "kubectl get pods"
            sh "aws cloudformation update-stack --stack-name udacity-capstone-nodes --template-body file://aws/worker_nodes.yml --parameters file://aws/worker_nodes_parameters.json --capabilities CAPABILITY_IAM"
        }
      }
    }
    stage("Cleaning up") {
      echo 'Cleaning up...'
      sh "docker system prune"
    }
}
