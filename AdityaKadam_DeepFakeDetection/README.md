# 🧠 Deepfake Detection using CIFAKE Dataset

## 📌 Project Overview
With the rapid advancement of generative AI, distinguishing between real and AI-generated images has become an important challenge.

This project implements a deep learning–based system to detect **AI-generated synthetic images** using the **CIFAKE dataset**.

The model classifies images into:

- **REAL** – natural images  
- **FAKE** – GAN-generated synthetic images  

---

## 🎯 Objective
To design and implement a deep learning model capable of detecting synthetic (AI-generated) images using transfer learning techniques.

---

## 📂 Dataset Used

**CIFAKE – Real and AI-Generated Synthetic Images**

Dataset link:  
https://www.kaggle.com/datasets/birdy654/cifake-real-and-ai-generated-synthetic-images

### Dataset Structure
```
train/
 ├── REAL
 └── FAKE

test/
 ├── REAL
 └── FAKE
```

---

## 🧠 Model Architecture

The project uses **EfficientNetB0**, pretrained on the ImageNet dataset.

Architecture pipeline:

```
EfficientNetB0 (pretrained)
↓
Global Average Pooling
↓
Dense Layer (128 units, ReLU)
↓
Dropout (0.4)
↓
Output Layer (1 unit, Sigmoid)
```

### Model Details
- Total parameters: ~4.2 million  
- Trainable parameters: ~160,000  
- Backbone network frozen during training  

---

## ⚙️ Technologies Used
- Python  
- TensorFlow / Keras  
- EfficientNet  
- NumPy  
- Matplotlib  
- OpenCV  
- MTCNN  
- Google Colab  
- Kaggle API  

---

## 🏃 Model Training

- Optimizer: Adam  
- Loss Function: Binary Crossentropy  
- Batch Size: 32  
- Epochs: 8  
- Training Method: Transfer Learning  

---

## 📊 Results

| Metric | Value |
|------|------|
| Validation Accuracy | **~94%** |
| Validation Loss | ~0.12 |
| Training Epochs | 8 |

The results demonstrate strong generalization on unseen CIFAKE test images.

---

## 🧪 Evaluation Method

- Training performed on CIFAKE training set  
- Testing performed on CIFAKE test set  
- No external datasets were used  
- Evaluation metrics include accuracy and loss  

---

## ⚠️ Limitations

- CIFAKE is not a face-deepfake dataset  
- The model cannot reliably classify human selfies  
- Images are low-resolution (CIFAR-style)  
- Model performance is limited to CIFAKE-like images  

---

## 🚀 Future Scope

- Training on face-specific deepfake datasets (DFDC, CelebA-HQ)  
- Video-based deepfake detection  
- Ensemble learning approaches  
- Web or mobile deployment  

---

## 🏁 Conclusion

This project successfully demonstrates how transfer learning can be applied to detect AI-generated synthetic images.

Using EfficientNetB0 and the CIFAKE dataset, the system achieves high accuracy while maintaining a simple and efficient architecture.

The project provides a strong foundation for further research in deepfake detection.

---

## 👨‍🎓 Author
**Aditya Kadam**  
