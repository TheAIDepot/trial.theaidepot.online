/**
 * Main JavaScript for The AI Depot Website
 * Created: June 2025
 */

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const contactForm = document.getElementById('contact-form');

// ROI Calculator Elements
const costPerLeadInput = document.getElementById('cost-per-lead');
const leadsPerMonthInput = document.getElementById('leads-per-month');
const conversionRateInput = document.getElementById('conversion-rate');
const orderValueInput = document.getElementById('order-value');
const calculateButton = document.getElementById('calculate-roi');
const monthlySpendOutput = document.getElementById('monthly-spend');
const acquisitionCostOutput = document.getElementById('acquisition-cost');
const wastedSpendOutput = document.getElementById('wasted-spend');
const leadsNotConvertedOutput = document.getElementById('leads-not-converted');
const missedRevenueOutput = document.getElementById('missed-revenue');
const potentialRevenueOutput = document.getElementById('potential-revenue');
const conversionChart = document.getElementById('conversion-chart');

// Mobile Navigation Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ROI Calculator Functionality
if (calculateButton) {
    calculateButton.addEventListener('click', calculateROI);
}

function calculateROI() {
    // Get input values
    const costPerLead = parseFloat(costPerLeadInput.value) || 50;
    const leadsPerMonth = parseFloat(leadsPerMonthInput.value) || 100;
    const conversionRate = parseFloat(conversionRateInput.value) || 10;
    const orderValue = parseFloat(orderValueInput.value) || 3500;
    
    // Calculate results
    const monthlySpend = costPerLead * leadsPerMonth;
    const convertedLeads = Math.round(leadsPerMonth * (conversionRate / 100));
    const notConvertedLeads = leadsPerMonth - convertedLeads;
    const acquisitionCost = convertedLeads > 0 ? monthlySpend / convertedLeads : 0;
    const wastedSpend = monthlySpend - (convertedLeads * acquisitionCost);
    const missedRevenue = notConvertedLeads * orderValue;
    
    // Calculate AI improvement (assuming 22% additional conversion)
    const aiImprovement = 0.22; // 22% improvement with AI
    const additionalConversions = Math.round(notConvertedLeads * aiImprovement);
    const potentialRevenue = additionalConversions * orderValue;
    
    // Update output elements
    monthlySpendOutput.textContent = formatCurrency(monthlySpend);
    acquisitionCostOutput.textContent = formatCurrency(acquisitionCost);
    wastedSpendOutput.textContent = formatCurrency(wastedSpend);
    leadsNotConvertedOutput.textContent = notConvertedLeads;
    missedRevenueOutput.textContent = formatCurrency(missedRevenue);
    potentialRevenueOutput.textContent = formatCurrency(potentialRevenue);
    
    // Update chart
    updateConversionChart(convertedLeads, notConvertedLeads, additionalConversions);
    
    // Animate the results
    animateResults();
}

function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateConversionChart(converted, notConverted, aiConverted) {
    // This is a simplified chart implementation
    // In a real implementation, you might use a library like Chart.js
    
    const total = converted + notConverted;
    const convertedPercent = (converted / total) * 100;
    const aiConvertedPercent = (aiConverted / total) * 100;
    const notConvertedPercent = 100 - convertedPercent - aiConvertedPercent;
    
    // Create a simple bar chart
    conversionChart.innerHTML = `
        <div class="chart-bar">
            <div class="chart-segment traditional" style="width: ${convertedPercent}%"></div>
            <div class="chart-segment ai-converted" style="width: ${aiConvertedPercent}%"></div>
            <div class="chart-segment not-converted" style="width: ${notConvertedPercent}%"></div>
        </div>
        <div class="chart-labels">
            <div class="chart-label">Traditional: ${convertedPercent.toFixed(1)}%</div>
            <div class="chart-label">AI Additional: ${aiConvertedPercent.toFixed(1)}%</div>
            <div class="chart-label">Not Converted: ${notConvertedPercent.toFixed(1)}%</div>
        </div>
    `;
    
    // Add styles for the chart
    const style = document.createElement('style');
    style.textContent = `
        .chart-bar {
            height: 40px;
            background-color: #444;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            margin-bottom: 10px;
        }
        .chart-segment {
            height: 100%;
            transition: width 0.5s ease;
        }
        .chart-segment.traditional {
            background-color: #30b4c5;
        }
        .chart-segment.ai-converted {
            background-color: #ff7f27;
        }
        .chart-segment.not-converted {
            background-color: #555;
        }
        .chart-labels {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
}

function animateResults() {
    // Add animation class to results
    const results = document.querySelectorAll('.result-item p, .opportunity-item p');
    results.forEach(result => {
        result.classList.add('animated');
        setTimeout(() => {
            result.classList.remove('animated');
        }, 1000);
    });
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            animation: pulse 1s ease;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); color: #ff7f27; }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Validate form
    if (!validateForm(formValues)) {
        return;
    }
    
    // Show success message (in a real implementation, you would send this data to a server)
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <h3>Thank you for your interest!</h3>
        <p>We've received your information and will contact you shortly to discuss how The AI Depot can help your business generate more qualified appointments.</p>
    `;
    
    // Replace form with success message
    contactForm.innerHTML = '';
    contactForm.appendChild(successMessage);
    
    // Add success message style
    const style = document.createElement('style');
    style.textContent = `
        .form-success {
            text-align: center;
            padding: 40px 20px;
        }
        .form-success h3 {
            color: #30b4c5;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

function validateForm(formValues) {
    let isValid = true;
    const requiredFields = ['first-name', 'last-name', 'company-name', 'email', 'phone', 'challenges'];
    
    // Check required fields
    for (const field of requiredFields) {
        if (!formValues[field]) {
            isValid = false;
            highlightInvalidField(field);
        }
    }
    
    // Check if at least one connect method is selected
    const connectMethods = document.querySelectorAll('input[name="connect-method"]:checked');
    if (connectMethods.length === 0) {
        isValid = false;
        alert('Please select at least one preferred connection method.');
    }
    
    return isValid;
}

function highlightInvalidField(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add('invalid');
    
    // Add invalid field style
    const style = document.createElement('style');
    style.textContent = `
        .invalid {
            border: 2px solid #ff7f27 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Remove highlight when field is corrected
    field.addEventListener('input', () => {
        field.classList.remove('invalid');
    });
}

// Initialize the calculator with default values on page load
document.addEventListener('DOMContentLoaded', () => {
    if (calculateButton) {
        calculateROI();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});
