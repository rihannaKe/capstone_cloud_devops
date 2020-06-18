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
			steps {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh '''
						kubectl config use-context arn:aws:eks:us-east-2:576136082284:cluster/MyCapstoneEKS-yjQYyIp7laWr
					'''
				}
			}
		}

		stage('Deploy blue container') {
			steps {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh '''
						kubectl apply -f blue-controller.json
					'''
				}
			}
		}

		stage('Deploy green container') {
			steps {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh '''
						kubectl apply -f green-controller.json
					'''
				}
			}
		}

		stage('Create the service in the cluster, redirect to blue') {
			steps {
				withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh '''
						kubectl apply -f blue-service.json
					'''
				}
			}
		}

		stage('Wait user approve') {
        steps {
            input "Ready to redirect traffic to green?"
        }
    }

		stage('Create the service in the cluster, redirect to green') {
			steps {
			withAWS(credentials: 'demo-ecr-credentials', region: 'us-east-2') {
					sh '''
						kubectl apply -f green-service.json
					'''
				}
			}
		}

    stage("Cleaning up") {
      echo 'Cleaning up...'
      sh "docker system prune"
    }

}
