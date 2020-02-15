from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


ma = Marshmallow()
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    created_at = db.Column(db.DateTime())
    updated_at = db.Column(db.DateTime())

    def __init__(self, username, email, password, created_at, updated_at):
        self.username = username
        self.email = email
        self.password = password
        self.created_at = created_at
        self.updated_at = updated_at


class UserSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)


class Lms(db.Model):
    __tablename__ = 'lms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True, index=True)
    url = db.Column(db.Text())
    token = db.Column(db.Text())
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    def __init__(self, name, url, token, created_at, updated_at):
        self.name = name
        self.url = url
        self.token = token
        self.created_at = created_at
        self.updated_at = updated_at


class LmsSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    url = fields.String(required=True)
    token = fields.String(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)
