from marshmallow import Schema, fields, ValidationError

class LikeRequest(Schema):
    post_id = fields.Integer(required=True, error_messages={
        "required": "El 'post_id' es obligatorio.",
        "invalid": "El 'post_id' debe ser un número entero."
    })