# Import Libraries
import requests
import os
from fastapi import HTTPException
from IPython.display import display
from PIL import Image
import pickle
import tensorflow
import numpy as np
from numpy.linalg import norm
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
#import cv2
import pandas as pd


PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
IMAGES_FOLDER_PATH = os.path.join(PROJECT_PATH, 'images')
os.makedirs(IMAGES_FOLDER_PATH, exist_ok=True)

image_feature_list_derectory = os.getcwd() + '\\image_feature_list.pkl'
image_feature_list = np.array(pickle.load(
    open(image_feature_list_derectory, 'rb')))
image_feature_list = image_feature_list.tolist()

image_ids_derectory = os.getcwd() + '\\image_ids.pkl'
image_ids = list(pickle.load(open(image_ids_derectory, 'rb')))


# Load The model ResNet50
model = ResNet50(weights='imagenet', include_top=False,
                 input_shape=(500, 500, 3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])
print("model created :", model.__class__.__name__)


## ------------------------------------- Download the image Locally --------------------------------- ##
def download_images(image_url: str, folder_path: str):
    ''' This Function is to download images only using the provided image link.

    Args:
    ***
        (image_url: str) --> The provided image link to be downloaded.
        (folder_path: str) --> The folder path to download the image on it.

    Returns:
    ****
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

            import urllib.request
        

            urllib.request.urlretrieve(image_url, image_path_local)

            return image_path_local

        else:
            raise HTTPException(
                status_code=400, detail='There is an error in downloading the image, check it again.')

    except:
        raise HTTPException(
            status_code=400, detail='There is an error in downloading the image, check it again.')

## ------------------------------------- Extract features maps from image --------------------------------- ##
def extract_image_features(image_path: str):
    ''' This Function is to extract the features from the image.

    Args:
    *****
        (image_path: str) --> The string that contains the image path to extract features from the image and git the similar images.

    Returns:
    ********
        (features: List) --> The Extracted Features from the provide image path.
    '''
    img = image.load_img(image_path, target_size=(500, 500))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    return normalized_result


def search_semiler_image(image_id: str, top_k: int):
    ''' This Function is to Search similar images.

    Args:
    *****
        (image_id: str) --> The string that contains the image id to extract features from the image and git the similar images.
        (top_k: int) --> The number of similar images to be returned.

    Returns:
    ********
        (ids: List) --> The list of similar image ids.
    '''
    index_pruduct = image_ids.index(image_id)
    normalized_result = image_feature_list[index_pruduct]
    neighbors = NearestNeighbors(
        n_neighbors=top_k+1, algorithm='brute', metric='euclidean')
    neighbors.fit(image_feature_list)

    distances, indices = neighbors.kneighbors([normalized_result])
    indices = indices[0][1:]
    ids = [image_ids[i] for i in indices]

    return ids


def add_image_to_database(image_url: str, id: str):
    '''
    This Function is to add the image to the database.
    Args:
    *****
        (image_url: str) --> The string that url of the image.
        (id: str) --> the string that contains the image id.

    Returns:
    ********
        'Add Done: image id is {id} ..'
    '''
    # try:
    image_path_local = download_images(
        image_url=image_url, folder_path=IMAGES_FOLDER_PATH)

    normalized_result = extract_image_features(image_path_local)

    image_feature_list.append(normalized_result)
    image_ids.append(id)

    print(id)
    pickle.dump(image_feature_list, open(
        image_feature_list_derectory, 'wb'))
    pickle.dump(image_ids, open(image_ids_derectory, 'wb'))
    _ = [os.remove(os.path.join(os.path.join(PROJECT_PATH, IMAGES_FOLDER_PATH), image))
            for image in os.listdir(os.path.join(PROJECT_PATH, IMAGES_FOLDER_PATH))]
    return {f'Add Done: image id is {id} ..'}
    # except Exception as e:
    #     raise HTTPException(status_code=400, detail=str(
    #         "There is error while adding image to database"
    #     ))


def Delete_image_from_database(id: str):
    '''
    This Function is to delete the image to the database.
    Args:
    *****
        (id: str) --> the string that contains the image id.

    Returns:
    ********
        'Delete Done: image id is {id} ..'
    '''
    if id in image_ids:
        try:
            index = image_ids.index(id)
            image_feature_list.remove(image_feature_list[index])
            image_ids.remove(image_ids[index])

            pickle.dump(image_feature_list, open(
                image_feature_list_derectory, 'wb'))
            pickle.dump(image_ids, open(image_ids_derectory, 'wb'))
            return {f'Delete Done: image id is {id} ..'}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(
                "There is error while Deleting image to database"
            ))
    else:
        return 'There is no image with this id : {id}'

# add_image_to_daatabase(
#     'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg')


# distances, indices = search_semiler_image(
#     'images/painting-mountain-lake-with-mountain-background_188544-9126.jpg', 10)
# print(distances, indices)
# print(filenames[indices[0]])
