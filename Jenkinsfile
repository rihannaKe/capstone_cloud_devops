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

    stage('Set current kubectl context') { 
      echo 'Setting  kubectl context...'
      dir ('./') {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh 'kubectl config use-context arn:aws:eks:us-east-2:576136082284:cluster/MyCapstoneEKS-yjQYyIp7laWr'
				}
      }
		}

		stage('Deploy blue container') {
      echo 'Deploying  blue container...'
      withAWS(region:'us-east-1', credentials:'demo-ecr-credentials') {
        sh '''
          kubectl create -f ./aws/blue-controller.json
        '''
        
			}
		}

		stage('Deploy green container') {
       echo 'Deploying  green container...'
        dir ('./') {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh 'kubectl create -f green-controller.json'
				}
        }
		}

		stage('Create the service in the cluster, redirect to blue') {
      echo 'Creating service in the cluster...'
        dir ('./') {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					  sh 'kubectl apply -f blue-service.json'
				  }
        }
		}

		stage('Create the service in the cluster, redirect to green') {
      echo 'Ready to switch'
      echo 'Create the service in the cluster, redirect to green'
      dir ('./') {
			withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh 'kubectl apply -f green-service.json'
				}
      }
		}

    stage("Cleaning up") {
      echo 'Cleaning up...'
      sh 'docker system prune'
    }

}
