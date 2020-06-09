pipeline {
    agent { dockerfile true }
    environment {
        npm_config_cache = 'npm-cache'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
       
        stage('Deliver') {
            steps {
                sh 'jenkins/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'jenkins/kill.sh'
            }
        }
    }
}