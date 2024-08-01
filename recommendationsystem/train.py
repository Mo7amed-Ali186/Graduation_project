import pickle
from pymongo import MongoClient
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import os
from tqdm import tqdm
from fastapi import HTTPException
import requests
import pandas as pd
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

from pymongo.server_api import ServerApi


def download_images(image_url: str, folder_path: str):
    ''' This Function is to download images only using the provided image link.

    Args:
    *****
        (image_url: str) --> The provided image link to be downloaded.
        (folder_path: str) --> The folder path to download the image on it.

    Returns:
    ********
        (image_local_path: str) --> The local path of the downloaded image.
    '''
    try:
        # Request
        response = requests.get(image_url)
        # Continue if it is ok
        if response.status_code == 200:
            image_basename = os.path.basename(image_url).split('.')

            # Prepare the path in which you will download the image
            image_path_local = os.path.join(
                folder_path, f'{image_basename[0]}.{image_basename[1]}')

            # Wrtite the image to the local path
            with open(image_path_local, 'wb') as f:
                f.write(response.content)

            return image_path_local

        else:
            raise HTTPException(
                status_code=400, detail='There is an error in downloading the image, check it again.')

    except:
        raise HTTPException(
            status_code=400, detail='There is an error in downloading the image, check it again.')


PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
IMAGES_FOLDER_PATH = os.path.join(PROJECT_PATH, 'images')
os.makedirs(IMAGES_FOLDER_PATH, exist_ok=True)

# Load dotenv file
_ = load_dotenv(override=True)
MONGODB_URL = os.getenv('MONGODB_URL')
client = MongoClient(MONGODB_URL, server_api=ServerApi('1'))
db = client.E_Commerce
db_products = db.products
data = db_products.find()


list_products = []
for i in tqdm(list(data)):

    image_path_local = download_images(
        i['mainImage']['secure_url'], 'images\\')
    dict_products = {
        '_id': str(i['_id']),
        'path': os.path.join(PROJECT_PATH, image_path_local)
    }
    list_products.append(dict_products)


model = ResNet50(weights='imagenet', include_top=False,
                 input_shape=(500, 500, 3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])


def extract_features(img_path, model):
    img = image.load_img(img_path, target_size=(500, 500))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    return normalized_result


image_ids = []

for product in list_products:
    image_ids.append(product['_id'])


image_feature_list = []
path = 'images/'
for product in tqdm(list_products):
    image_feature_list.append(extract_features(
        os.path.join(os.getcwd(), product['path']), model))

pickle.dump(image_feature_list, open('image_feature_list.pkl', 'wb'))
pickle.dump(image_ids, open('image_ids.pkl', 'wb'))

_ = [os.remove(os.path.join(os.path.join(PROJECT_PATH, IMAGES_FOLDER_PATH), image))
     for image in os.listdir(os.path.join(PROJECT_PATH, IMAGES_FOLDER_PATH))]
