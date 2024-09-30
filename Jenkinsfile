pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        REPO = 'https://github.com/AhmadTChaudhry/SIT753'
        DOCKER_IMAGE = 'ahmadtc/753'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Run Server and Tests') {
            parallel {
                stage('Server') {
                    steps {
                        script {
                            sh 'npm start &'
                            sleep 10
                        }
                    }
                }
                stage('Test') {
                    steps {
                        script {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    sh 'kill $(jobs -p)' // This will terminate background jobs
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    sh 'docker login -u ahmadtc -p H2Chuhet123'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    // Deploy to production (replace with your specific deployment command)
                    sh 'docker run -d -p 80:3040 $DOCKER_IMAGE'
                }
            }
        }
    }
}
