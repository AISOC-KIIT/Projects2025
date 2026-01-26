import streamlit as st
import os
from PIL import Image

from utils.inference import load_model, predict_image

st.set_page_config(
    page_title="Deepfake Image Detector",
    layout="centered"
)

st.title("🕵️ Image Deepfake Detection")
st.write("Upload an image to check whether it is **REAL or AI-GENERATED (FAKE)**.")

MODEL_PATH = "models/custom_cnn_cifake.pth"

# -------------------------
# MODEL CHECK (IMPORTANT)
# -------------------------
if not os.path.exists(MODEL_PATH):
    st.error("❌ Model not found!")
    st.info(
        "The trained model file is missing.\n\n"
        "**Expected location:**\n"
        "`models/custom_cnn_cifake.pth`\n\n"
        "➡️ Please train the model or place the `.pth` file in the models folder."
    )
    st.stop()   # ⛔ stop execution cleanly (NO BLANK PAGE)

# -------------------------
# LOAD MODEL SAFELY
# -------------------------
@st.cache_resource
def load_cached_model():
    return load_model(MODEL_PATH)

try:
    model = load_cached_model()
except Exception as e:
    st.error("❌ Failed to load the model")
    st.exception(e)
    st.stop()

st.success("✅ Model loaded successfully")

# -------------------------
# IMAGE UPLOAD
# -------------------------
uploaded_file = st.file_uploader(
    "Upload an image",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file:
    image = Image.open(uploaded_file).convert("RGB")

    st.image(image, caption="Uploaded Image", use_container_width=True)

    with st.spinner("Analyzing image..."):
        label, confidence = predict_image(model, image)

    st.subheader("Prediction Result")

    if label == "REAL":
        st.success("✅ REAL IMAGE")
    else:
        st.error("⚠️ FAKE / AI-GENERATED IMAGE")

    st.write(f"**Confidence:** `{confidence * 100:.2f}%`")
