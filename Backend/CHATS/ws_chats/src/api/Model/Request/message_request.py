from marshmallow import Schema, fields

class MessageCreateRequest(Schema):
    sender_user = fields.Integer(required=True)
    message_content = fields.String(required=True)