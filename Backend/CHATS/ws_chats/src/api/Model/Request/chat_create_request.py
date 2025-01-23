from marshmallow import Schema, fields

class ChatCreateRequest(Schema):
    user_1 = fields.Integer(required=True)
    user_2 = fields.Integer(required=True)