global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = '<span>Nova postagem no <strong>blog da ThaisTrindade!</strong><br />Assunto: <strong>{title}</strong> <br /><a href="http://localhost:4200/#/post/{id}" target="_blank">Clique aqui e saiba mais</a></span>';
global.EMAIL_TMPL_CONTACT = '<span>Você recebeu uma mensagem de <strong>{name}</strong> através do <strong>Blog da Thais trindade</strong></span><br /><strong>Mensagem:</strong> {message}';

module.exports = {
    connectionString: 'mongodb://cristian:cri022010@ds034807.mlab.com:34807/blog',
    sendgridKey: '',
    containerConnectionString: 'TBD'
}