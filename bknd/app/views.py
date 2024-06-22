from flask import jsonify

def index():
    return jsonify({'mesage':'Hello world API Pokemaniacs'})