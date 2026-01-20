pipeline {
    agent any

    stages {

        stage('Detect Active Environment') {
            steps {
                script {
                    def blueRunning = sh(
                        script: "pm2 list | grep blue || true",
                        returnStatus: true
                    )

                    if (blueRunning == 0) {
                        env.NEW_ENV = "green"
                        env.OLD_ENV = "blue"
                    } else {
                        env.NEW_ENV = "blue"
                        env.OLD_ENV = "green"
                    }

                    echo "Deploying to ${env.NEW_ENV}"
                }
            }
        }

        stage('Deploy New Version') {
            steps {
                script {
                    sh """
                    echo "Cleaning target directory"
                    rm -rf /var/www/${env.NEW_ENV}/*

                    echo "Copying files"
                    rsync -av ${env.NEW_ENV}/ /var/www/${env.NEW_ENV}/

                    cd /var/www/${env.NEW_ENV}
                    npm install
                    """
                }
            }
        }

        stage('Start New App') {
            steps {
                script {
                    sh """
                    cd /var/www/${env.NEW_ENV}
                    pm2 start app.js --name ${env.NEW_ENV} || pm2 restart ${env.NEW_ENV}
                    """
                }
            }
        }

        stage('Stop Old App') {
            steps {
                script {
                    sh "pm2 stop ${env.OLD_ENV} || true"
                }
            }
        }
    }
}
