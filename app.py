import datetime
import firebase_admin
import os
import re
import uuid
from base64 import b64decode
from dotenv import load_dotenv
from firebase_admin import credentials, storage
from flask import Flask, request

load_dotenv()

app = Flask(__name__, static_folder='build/', static_url_path='/')

cred = credentials.Certificate({
    "type": os.getenv('FIREBASE_TYPE'),
    "project_id": os.getenv('FIREBASE_PROJECT_ID'),
    "private_key_id": os.getenv('FIREBASE_PRIVATE_KEY_ID'),
    "private_key": os.getenv('FIREBASE_PRIVATE_KEY').replace("\\n", "\n"),
    "client_email": os.getenv('FIREBASE_CLIENT_EMAIL'),
    "client_id": os.getenv('FIREBASE_CLIENT_ID'),
    "auth_uri": os.getenv('FIREBASE_AUTH_URI'),
    "token_uri": os.getenv('FIREBASE_TOKEN_URI'),
    "auth_provider_x509_cert_url": os.getenv('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
    "client_x509_cert_url": os.getenv('FIREBASE_CLIENT_X509_CERT_URL')
})

firebase_admin.initialize_app(cred, {
    'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET')
})


def upload_to_cloud(data):
    bucket = storage.bucket()
    unique_id = uuid.uuid4().hex
    blob = bucket.blob(f"{unique_id}.png")
    blob.upload_from_string(data, content_type="image/png")
    return unique_id


def get_image_from_cloud(id):
    bucket = storage.bucket()
    blob = bucket.blob(f"{id}.png")
    if blob.exists():
        expiration_date = datetime.timedelta(minutes=10)
        url = blob.generate_signed_url(expiration=expiration_date, version="v4")
        return url
    return False


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/upload', methods=['POST'])
def upload_image():
    image = request.json.get('image')
    base64_string = image.split(",", 1)[1]
    image_id = upload_to_cloud(b64decode(base64_string))
    return {"id": image_id}


@app.route('/view/<string:id>', methods=['GET'])
def view_image(id):
    url = get_image_from_cloud(id)
    return { "url": url }
