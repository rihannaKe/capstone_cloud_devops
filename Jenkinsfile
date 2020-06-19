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

    stage('Linting') {
        echo 'Linting...'
        sh 'tidy -q -e app/*.html'
    }

    stage('Building image') {
        echo 'Building Docker image...'
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD "
            sh "docker build -t ${registry} ."
            sh "docker tag ${registry} ${registry}"
            sh "docker push ${registry}"
            echo 'Pushed to docker hub'
        }
    }

    stage('Creating infra eks') {
        sh './aws/create_infrastructure.sh'
        sh './aws/create_eks'
        //        sh './aws/create_worker_nodes'
    }

//    stage('Set current kubectl context') {
//        echo 'Setting  kubectl context...'
//        dir ('./') {
//            withAWS(credentials: 'demo-eks-credentials', region: 'us-east-2') {
//                sh 'kubectl config use-context arn:aws:eks:us-east-2:576136082284:cluster/MyCapstoneEKS-yjQYyIp7laWr'
//            }
//        }
//    }
//
//    stage('Deploy blue container') {
//        echo 'Deploying  blue container...'
//        sh 'kubectl create -f k8/blue-controller.json'
//    }
//
//    stage('Deploy green container') {
//        echo 'Deploying  green container...'
//        sh 'kubectl create -f k8/green-controller.json'
//    }
//
//    stage('Create the service in the cluster, redirect to blue') {
//        echo 'Creating service in the cluster...'
//        sh 'kubectl apply -f k8/blue-service.json'
//    }
//
//    stage('Create the service in the cluster, redirect to green') {
//        echo 'Ready to switch'
//        echo 'Create the service in the cluster, redirect to green'
//        sh 'kubectl apply -f k8/green-service.json'
//    }

    stage('Cleaning up') {
        echo 'Cleaning up...'
        sh 'docker system prune'
    }
}
