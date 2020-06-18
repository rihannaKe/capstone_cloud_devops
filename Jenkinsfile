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

    stage("Linting") {
      echo 'Linting...'
      sh 'tidy -q -e app/*.html' 
    }

    stage('Creating') {
      echo 'Deploying to AWS...'
      dir ('./') {
        withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
            sh './aws/create_eks.sh'
            sh './aws/create_worker_nodes.sh'
        }
      }
    }



    
   
}
