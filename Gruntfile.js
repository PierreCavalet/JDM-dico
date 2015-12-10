// project config
module.exports = function(grunt) {
    grunt.initConfig({
        // deploy
        secret: grunt.file.readJSON('secret.json'),


        sshexec: {
            deploy: {
                command: [
                    'cd /root/',
                    'rm -r jeuxdemots/',
                    'git clone git@github.com:PierreCavalet/JDM-dico.git',
                    'npm install',
                    'forever stop server.js',
                    'forever start server.js',
                    'forever list'
                ].join(' && '),
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-ssh');
    grunt.registerTask('default', '');
    grunt.registerTask('deploy', ['sshexec:deploy']);


}