# 📊 DATA.md — Mock Data Structure

## Overview

The app uses in-memory JavaScript arrays as a mock database (`lib/data.ts`). This is intentional for the capstone — no real database setup is required.

## Data Models

### ServiceProvider
| Field        | Type             | Description                     |
|-------------|------------------|---------------------------------|
| id          | string           | Unique ID (e.g. "svc-001")     |
| name        | string           | Provider's full name            |
| email       | string           | Contact email                   |
| avatar      | string           | Avatar image path               |
| rating      | number           | Average rating (1-5)            |
| reviewCount | number           | Total number of reviews         |
| location    | string           | Full address                    |
| city        | string           | City name                       |
| category    | ServiceCategory  | Main category                   |
| services    | string[]         | List of offered services        |
| priceRange  | string           | Price description               |
| experience  | string           | Years of experience             |
| hoursWorked | string           | Total hours worked              |
| description | string           | Bio/description                 |
| phone       | string[]         | Contact phone numbers           |
| availability| Array            | Day/hours schedule              |
| verified    | boolean          | Is provider verified            |
| covidFree   | boolean          | Covid-free certification        |
| createdBy   | string           | userId of the provider          |

### Booking
| Field        | Type          | Description                     |
|-------------|---------------|---------------------------------|
| id          | string        | Unique booking ID               |
| serviceId   | string        | Related service provider ID     |
| serviceName | string        | Name of the service             |
| providerName| string        | Provider's name                 |
| customerName| string        | Customer's name                 |
| customerId  | string        | Customer's user ID              |
| providerId  | string        | Provider's user ID              |
| date        | string        | Booking date/time               |
| time        | string        | Time slot                       |
| location    | string        | Service location                |
| status      | BookingStatus | Upcoming/Confirmed/Completed/Cancelled |
| phone       | string        | Contact phone                   |
| price       | string        | Price for the service           |

### ServiceCategory (union type)
Household, Cleaning / Cooker / Housekeeper, Nanny / Babysitter, Handy men, Guday Adesani, Food, Housing, Education, Health, Beauty, Tech

## Helper Functions

- `getServiceById(id)` — Find a service by ID
- `getServicesByCategory(category)` — Filter by category
- `searchServices(query, city?)` — Full-text search
- `getBookingsByCustomer(customerId)` — Customer's bookings
- `getBookingsByProvider(providerId)` — Provider's bookings

## Current Mock Data

- **8 service providers** across multiple categories
- **4 sample bookings** with various statuses
- **11 service categories**

---

*In a production app, this would be replaced with a real database (PostgreSQL, etc.)*
