import React from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../Partials/MainHeader';

function ChooseEnd() {
    let { start } = useParams()
    console.log(start)

    return (
        <div className='ChooseEnd'>
            <MainHeader />
            <div className='container'>
                <h3>Start location chosen: {start}</h3>
                <h3>Choose end location</h3>

                <div class="card">
                    <div class="container">
                        <a href={start + '/X-Ray_MRI'}>X-Ray, MRI, and Radiology</a>
                        <p>UK Radiology provides state-of-the-art diagnostic imaging services for 
                            patients using computed tomography (CT), magnetic resonance imaging (MRI), 
                            radionuclide imaging (nuclear medicine), ultrasonography (US), and 
                            conventional radiography (X-ray).</p> 
                    </div>
                </div>
                
                <div class="card">
                    <div class="container">
                        <a href={start + '/General Surgery'}>General Surgery</a>
                        <p>UK General Surgery provides all aspects of patient care related to each 
                            field of general surgery, including gastrointestinal, surgical oncology, 
                            vascular, and trauma and critical care surgery.</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href={start + '/Vascular Interventional Radiology'}>Vascular Interventional Radiology</a>
                        <p>Interventional radiologists use state-of-the-art imaging modalities such as 
                            CT, fluoroscopy and ultrasound to perform image-guided, minimally invasive 
                            procedures to diagnose and treat conditions throughout the body such as cancer 
                            or stroke.</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href={start + '/Kentucky Neuroscience Institute'}>Kentucky Neuroscience Institute</a>
                        <p>At the Kentucky Neuroscience Institute, neurologists and neurosurgeons work together 
                            to handle the management, evaluation, diagnosis and treatment of complex neurological and 
                             neuromuscular conditions such as Alzheimer’s disease, Parkinson’s disease, amyotrophic 
                             lateral sclerosis (ALS or Lou Gehrig’s disease), multiple sclerosis and stroke.</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href={start + '/Orthopaedics'}>Orthopaedics</a>
                        <p>General orthopaedics focuses on the diagnosis, treatment and management of conditions 
                            connected to bones, joints and the musculoskeletal system.</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href={start + '/Anesthesia Preop Services'}>Anesthesia Preop Services</a>
                        <p>UK Anesthesiology provides complete, advanced anesthesiology services for all surgical 
                            procedures performed at UK HealthCare, ranging from minor outpatient procedures to 
                            major operations such as transplantation. The department also provides comprehensive pain 
                            management for postoperative, chronic, and cancer-related pain syndromes.</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href={start + '/Physical_Occupational Therapy'}>Physical Occupational Therapy</a>
                        <p>This clinic offers physical and occupational therapy services for patients of all ages, 
                            from infancy to advanced age. Some common conditions being: Acute/chronic back pain, 
                            Lumbar spine surgery, Total knee and hip replacement, etc.</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href={start + '/Pharmacy'}>Pharmacy</a>
                        <p>Our pharmacy offer a full range of prescription medications services, over-the-counter 
                            medications and sundry items. Patients seeing physicians at UK HealthCare can have their 
                            prescriptions sent directly to the pharmacy by their doctor’s office for convenient pickup.</p> 
                    </div>
                </div>

                <div class="card">
                    <div class="container">
                        <a href={start + '/Image Records Center'}>Image Records Center</a>
                        <p>The Image Records Center can provide a copy of your Radiology images upon request. The images 
                            will be in CD format, and include a copy of the corresponding written report.</p> 
                    </div>
                </div>
            </div>
		</div>
    )
}

export default ChooseEnd;