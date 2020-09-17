# Photo Uploader
Upload a photo to firebase with an effect selected. 
Able to share a link with friends to view the edited photo.

## 0. Clone repository
`git clone https://github.com/dannyfan/photo-uploader.git`

## 1. Set environment variables
Rename env.example to .env.
Follow the instructions at https://firebase.google.com/docs/admin/setup to create your admin sdk json.
Replace the variables from the json given. And "FIREBASE_STORAGE_BUCKET" replace the xxx with the name of your project made in firebase.
```bash
mv env.example .env
```

## 2. Install Dependencies
Recommended to create a virtual environment to handle dependencies for Python.
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Install dependencies for JavaScript.
```
yarn install
```

## 3. Run Locally
Application will be available at http://localhost:8000/.
```
yarn build
gunicorn app:app
```