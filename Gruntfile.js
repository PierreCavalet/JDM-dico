// project config
module.exports = function(grunt) {
    grunt.initConfig({
        // deploy
        secret: grunt.file.readJSON('secret.json'),

        sshexec: {
            deploy: {
                command: [
                    'cd ~',
                    'rm -r jeuxdemots/ || true',
                    'git clone git@github.com:PierreCavalet/JDM-dico.git jeuxdemots',
                    'cd jeuxdemots',
                    'npm install',
                    'bower install --allow-root',
                    'forever stop server.js || true',
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
