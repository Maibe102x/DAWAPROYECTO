from marshmallow import Schema, fields

class UploadPhotoRequest(Schema):
    image_url = fields.String(required=True)