# Virtual Try-On App (VTON)

A **Virtual Try-On (VTON) MVP** that allows users to virtually try a dress on a model image.  
This project demonstrates the **complete try-on workflow** — from image upload to final visual output — while laying a strong foundation for future research-based enhancements.

---

## Tech Stack
- **Frontend:** React
- **Backend:** Express.js (Node.js)
- **APIs:** BGRemover API (for dress background removal)

---

## Features
- Upload a **model image**
- Upload a **dress image**
- Remove **background from the dress image**
- **Drag & snap** the dress onto the model
- Adjust **width & height** of the dress
- View the **final virtual try-on output**

---

## Screenshots

![Upload Model](client/public/first.png)

### 1️⃣ Upload Model Image
![Upload Model](client/public/model_image.png)

### 2️⃣ Upload Dress Image
![Upload Dress](client/public/dress.png)

### 3️⃣ Final Try-On Output
![Try-On Output](client/public/width_height.png)

> 📌 Ensure the image filenames exactly match those inside `client/public`

---

## Project Approach (MVP Explanation)

The initial objective of this project was to build a **full-fledged Virtual Try-On system** using advanced computer vision techniques such as **OpenCV and MediaPipe**, including body pose detection, landmark estimation, and realistic cloth fitting.

However, **Virtual Try-On systems are largely research-oriented**, and most production-level and academic implementations rely heavily on **Python-based pipelines**. Libraries like OpenCV and MediaPipe offer better model support, ecosystem maturity, and research integrations in Python compared to JavaScript environments.

To ensure the idea was **executed practically rather than remaining theoretical**, this project was developed as an **MVP using a JavaScript-based stack**. The focus was on:
- Implementing the **core try-on flow**
- Handling real image uploads
- Enabling interactive drag, resize, and alignment
- Demonstrating feasibility through a working prototype

This MVP serves as a **proof of concept** that clearly communicates the vision and logic behind a VTON system.

---

## Future Scope

Virtual Try-On is an **active research domain** in computer vision and deep learning.  
Potential future enhancements include:

- Using **OpenCV** for image preprocessing and transformations  
- Integrating **MediaPipe** for body pose and keypoint detection  
- Implementing **cloth warping and deformation algorithms**  
- Exploring **deep learning-based VTON models** (GANs / diffusion models)  
- Migrating computationally intensive logic to **Python-based pipelines**  

This project is intentionally designed as a **foundation** for extending into advanced, research-grade VTON systems.

---

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/vton-app.git
cd vton-app
