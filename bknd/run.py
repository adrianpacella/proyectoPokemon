from flask import Flask
from app.views import *
from flask_cors import CORS
from app.database import init_app


#inicializacion del proyecto Flask
app = Flask(__name__)

init_app(app)
CORS(app)

app.route('/', methods=['GET'])(index)
app.route('/api/usuarios/', methods=['GET'])(get_all_usuarios)
app.route('/api/usuarios/<int:usuario_id>', methods=['GET'])(get_usuario)
app.route('/api/usuarios/', methods=['POST'])(create_usuario)
app.route('/api/usuarios/<int:usuario_id>', methods=['PUT'])(update_usuario)
app.route('/api/usuarios/<int:usuario_id>', methods=['DELETE'])(delete_usuario)
app.route('/api/productos/', methods=['GET'])(get_all_productos)
app.route('/api/productos/<int:producto_id>', methods=['GET'])(get_producto)
app.route('/api/productos/', methods=['POST'])(create_producto)
app.route('/api/productos/<int:producto_id>', methods=['PUT'])(update_producto)
app.route('/api/productos/<int:producto_id>', methods=['DELETE'])(delete_producto)


if __name__=='__main__':
    app.run(debug=True)