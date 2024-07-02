from app.database import get_db

class Usuario:

    #constuctor
    def __init__(self, id_usuario=None, firstname=None, lastname=None,direccion=None,email=None,password=None,interest=None,gender=None):
        self.id_usuario = id_usuario
        self.firstname = firstname
        self.lastname = lastname
        self.direccion = direccion
        self.email = email
        self.password = password
        self.interest = interest
        self.gender = gender

    def serialize(self):
        return {
            'id_usuario': self.id_usuario,
        'firstname': self.firstname,
        'lastname': self.lastname,
        'direccion': self.direccion,
        'email': self.email,
        'password': self.password,
        'interest': self.interest,
        'gender': self.gender
        }
    
    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        query = "SELECT * FROM usuarios"
        cursor.execute(query)
        rows = cursor.fetchall() #Me devuelve un lista de tuplas

        usuarios = [Usuario(id_usuario=row[0],firstname=row[1],lastname=row[2],direccion=row[3],email=row[4],password=row[5],interest=row[6],gender=row[7]) for row in rows]

        # movies = []
        # for row in rows:
        #     new_movie = Movie(id_movie=row[0], title=row[1], director=row[2], release_date=row[3], banner=row[4])
        #     movies.append(new_movie)

        cursor.close()
        return usuarios
        

    @staticmethod
    def get_by_id(usuario_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (usuario_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Usuario(id_usuario=row[0],firstname=row[1],lastname=row[2],direccion=row[3],email=row[4],password=row[5],interest=row[6],gender=row[7])
        return None
    
    """
    Insertar un registro si no existe el atributo id_movie
    """
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_usuario:
            cursor.execute("""
                UPDATE usuarios SET SET firstname = %s,lastname = %s,direccion = %s,email = %s,password = %s,interest = %s,gender = %s WHERE id_usuario = %s""",(self.firstname,self.lastname,self.direccion,self.email,self.password,self.interest,self.gender))
        else:
            cursor.execute("""
                INSERT INTO usuarios firstname,lastname,direccion,email,password,interest,gender)VALUES (%s,%s,%s,%s,%s,%s,%s,)""",(self.firstname,self.lastname,self.direccion,self.email,self.password,self.interest,self.gender))
            self.id_usuario = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM usuarios WHERE id_usuario = %s", (self.id_usuario,))
        db.commit()
        cursor.close()





class Producto:

    #constuctor
    def __init__(self, id_producto=None, nombre=None, categoria=None,marca=None,precio=None):
        self.id_producto = id_producto
        self.nombre = nombre
        self.categoria = categoria
        self.marca = marca
        self.precio = precio
        

    def serialize(self):
        return {
        'id_producto': self.id_producto,
        'nombre': self.nombre,
        'categoria': self.categoria,
        'marca': self.marca,
        'precio': self.precio,
        
        }
    
    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        query = "SELECT * FROM productos"
        cursor.execute(query)
        rows = cursor.fetchall() #Me devuelve un lista de tuplas

        productos = [Producto(id_producto=row[0],nombre=row[1],categoria=row[2],marca=row[3],precio=row[4]) for row in rows]

        # movies = []
        # for row in rows:
        #     new_movie = Movie(id_movie=row[0], title=row[1], director=row[2], release_date=row[3], banner=row[4])
        #     movies.append(new_movie)

        cursor.close()
        return productos
        

    @staticmethod
    def get_by_id(producto_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM productos WHERE id_producto = %s", (producto_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Producto(id_producto=row[0],nombre=row[1],categoria=row[2],marca=row[3],precio=row[4])
        return None
    
    """
    Insertar un registro si no existe el atributo id_producto
    """
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_producto:
            cursor.execute("""UPDATE productos SET nombre = %s,categoria = %s,marca = %s,precio = %s,WHERE id_producto = %s""",(self.nombre,self.categoria,self.marca,self.precio))
        else:
            cursor.execute("""
                INSERT INTO productos (nombre, categoria, marca, precio) VALUES (%s, %s, %s, %s)
            """, (self.nombre, self.categoria, self.marca, self.precio))
            self.id_producto = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM productos WHERE id_producto = %s", (self.id_producto,))
        db.commit()
        cursor.close()

