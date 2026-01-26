import torch
from PIL import Image
from models.custom_cnn import CustomCNN
from utils.preprocess import get_transform

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

CLASS_NAMES = ["FAKE", "REAL"]

def load_model(model_path):
    model = CustomCNN(num_classes=2)
    model.load_state_dict(torch.load(model_path, map_location=DEVICE))
    model.to(DEVICE)
    model.eval()
    return model

def predict_image(model, image: Image.Image):
    transform = get_transform()
    image = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(image)
        probs = torch.softmax(outputs, dim=1)
        confidence, pred = torch.max(probs, 1)

    return CLASS_NAMES[pred.item()], confidence.item()
