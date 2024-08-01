# Import Libraries
from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware

import os
# My Custom Functions
from utils import add_image_to_database, search_semiler_image, Delete_image_from_database



# Intialize an app
app = FastAPI(debug=True)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=30000)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder path for searching endpoint for the images.
PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
IMAGES_FOLDER_PATH = os.path.join(PROJECT_PATH, 'images')
os.makedirs(IMAGES_FOLDER_PATH, exist_ok=True)


## --------------------------------- EndPoint for Getting Similar Products ------------------------------ ##
@app.post('/photo-recommendation')
async def photo_recommendation(image_id: str = Form(...), top_k: int = Form(default=10)):
    if top_k <= 0 or not isinstance(top_k, int) or top_k > 100:
        raise HTTPException(
            status_code=400, detail="Bad Request: 'top_k' must be between integer and between 1 and 100.")
    ids = search_semiler_image(image_id, top_k)

    return {'image_ids': ids}


@app.post('/add-image')
async def add_image(image_url: str = Form(...), id: str = Form(...)):
    message = add_image_to_database(image_url=image_url, id=id)
    return {'message': message}


@app.post('/Delete-image')
async def Delete_image(id: str = Form(...)):
    message = Delete_image_from_database(id=id)
    return {'message': message}

# http://127.0.0.1:8000/docs#/default/add_image_add_image_post#request-bo
