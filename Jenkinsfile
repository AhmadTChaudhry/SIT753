pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        REPO = 'https://github.com/AhmadTChaudhry/SIT753'
        DOCKER_IMAGE = 'ahmadtc/753'
        SONAR_TOKEN = credentials('SonarCloudToken')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('SonarCloud Analysis') { // Add this new stage
            steps {
                script {
                    sh '''
                        # Set SonarCloud properties
                        echo "sonar.projectKey=AhmadTChaudhry_SIT753" > sonar-project.properties
                        echo "sonar.organization=ahmadtchaudhry" >> sonar-project.properties
                        echo "sonar.sources=." >> sonar-project.properties
                        echo "sonar.host.url=https://sonarcloud.io" >> sonar-project.properties
                        echo "sonar.login=$SONAR_TOKEN" >> sonar-project.properties

                        # Run the Sonar Scanner
                        sonar-scanner -Dproject.settings=sonar-project.properties
                    '''
                }
            }
        }

        stage('Run Server and Tests') {
            parallel {
                stage('Server') {
                    steps {
                        script {
                            // Start the server
                            sh 'npm start &'
                            sleep 5 // Wait for the server to start
                        }
                    }
                }
                stage('Test') {
                    steps {
                        script {
                            sleep 5 // Wait for the server to be ready
                            sh 'npm test' // Run your tests
                        }
                    }
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    sh 'docker run -d -p 80:3040 $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                script {
                    sh 'docker login -u ahmadtc -p H2Chuhet123' 
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
    }
}
