from flask import jsonify, request
from app.models import Usuario
from app.models import Producto

def index():
    return '<h1>Hola mundo con flask 🐍</h1>'

def get_all_usuarios():
    usuarios = Usuario.get_all()
    list_usuarios = [usuario.serialize() for usuario in usuarios]
    return jsonify(list_usuarios)

def create_usuario():
    #recepcionando los datos enviados en la peticion en formato JSON
    data = request.json
    new_usuario = Usuario(
        firstname=data['firstname'],
        lastname=data['lastname'],
        direccion=data['direccion'],
        email=data['email'],
        password=data['password'],
        interest=data['interest'],
        gender=data['gender'],
    )
    new_usuario.save()
    return jsonify({'message':'Usuario creada con exito'}), 201
    
def update_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Usuario not found'}), 404
    data = request.json
    usuario.firstname = data['firstname']
    usuario.lastname = data['lastname']
    usuario.direccion= data['direccion']
    usuario.email = data['email']
    usuario.password = data['password']
    usuario.interest = data['interest']
    usuario.gender = data['gender']
    usuario.save()
    return jsonify({'message': 'Usuario updated successfully'})

def get_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Usuario not found'}), 404
    return jsonify(usuario.serialize())

def delete_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Ususario not found'}), 404
    usuario.delete()
    return jsonify({'message': 'Usuario deleted successfully'})
    
   

def get_all_productos():
    productos = Producto.get_all()
    list_productos = [producto.serialize() for producto in productos]
    return jsonify(list_productos)

def create_producto():
    #recepcionando los datos enviados en la peticion en formato JSON
    data = request.json
    new_producto = Producto(
        nombre=data['nombre'],
        categoria=data['categoria'],
        marca=data['marca'],
        precio=data['precio'],
        
    )
    new_producto.save()
    return jsonify({'message':'Producto creado con exito'}), 201
    
def update_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto not found'}), 404
    data = request.json
    producto.nombre = data['nombre']
    producto.marca = data['marca']
    producto.categoria= data['categoria']
    producto.precio = data['precio']
    
    producto.save()
    return jsonify({'message': 'Producto updated successfully'})

def get_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto not found'}), 404
    return jsonify(producto.serialize())

def delete_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto not found'}), 404
    producto.delete()
    return jsonify({'message': 'Producto deleted successfully'})
    
   