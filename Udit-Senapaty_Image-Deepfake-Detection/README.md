# 🕵️ Deepfake Detection using CIFAKE Dataset

## 🧠 Overview
This project uses a custom CNN and pretrained models (ResNet18, VGG16) [if needed] to detect deepfake face images from the public CIFAKE dataset. Model performance is evaluated using accuracy, confusion matrix, ROC and PR curves. Interpretability is added through Grad-CAM heatmaps.

## 🧪 Train Models in Notebook

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1GEo7Ex2elaJEEAsS3nvKJj3qrgal7P9D?usp=sharing)

## Create Python venv, install dependencies and run App
```
python -m venv myenv
myenv\Scripts\activate

pip install -r requirements.txt

streamlit run app.py
```

## 📦 Tools & Frameworks
- Python
- PyTorch, torchvision
- CNN, ResNet18, VGG16
- Grad-CAM (torchcam)
- sklearn, seaborn, matplotlib

## 📈 Model Results

| Model     | Accuracy | AUC (ROC) | AUC (PR) |
|-----------|----------|-----------|----------|
| Custom CNN | 92.5%   | ~0.94     | ~0.94    |
| ResNet18   | 85.6%   | ~0.86     | ~0.86    |
| VGG16      | 89.8%   | ~0.90     | ~0.90    |

## 🔍 Evaluation Techniques
- Confusion Matrix  
- ROC Curve (AUC)  
- Precision-Recall Curve  
- Grad-CAM visualizations on fake and real images  

## 🔥 Grad-CAM Examples
- For Resnet18 and VGG16 models.

## 📚 Dataset Details & Citation

**Dataset:** CIFAKE – Real and AI-Generated Synthetic Images  
**Authors:** J.J. Bird and A. Lotfi (2024)  
**Paper:** *CIFAKE: Image Classification and Explainable Identification of AI-Generated Synthetic Images*, IEEE Access  
🔗 [Kaggle Dataset](https://www.kaggle.com/datasets/birdy654/cifake-real-and-ai-generated-synthetic-images)  
🔗 [Papers with Code Entry](https://paperswithcode.com/dataset/cifake-real-and-ai-generated-synthetic-images)

**Description:**  
The dataset consists of:
- 60,000 real images from the CIFAR-10 dataset (Krizhevsky & Hinton, 2009)
- 60,000 fake images generated using Stable Diffusion 1.4
- 100,000 training images (50k/class), 20,000 testing images (10k/class)
- Labeled into two classes: `REAL` and `FAKE`

**License:** MIT License — same as CIFAR-10  
This project does not claim ownership of the dataset. All rights remain with the original creators.

### Acknowledgements

This project is based on the **CIFAKE** dataset published by:

- Bird, J.J. and Lotfi, A. (2024). *CIFAKE: Image Classification and Explainable Identification of AI-Generated Synthetic Images*. IEEE Access.
- Krizhevsky, A., & Hinton, G. (2009). *Learning multiple layers of features from tiny images*.

## 📁 Repo Contents
- `CIFAKE_Deep_Learning.ipynb` – full model pipeline (Colab notebook)
- `plots/` – confusion matrix, ROC, PR curves, Grad-CAM overlays