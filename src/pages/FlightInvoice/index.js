
import React from 'react';

function FlightInvoice({ bookingDetails }) {
    // Destructuring the booking details to display the data
    const { flight_name, seattype, number_of_seat, number_of_guest_adult, number_of_guest_child, total_amount } = bookingDetails;

    // Function to format the total amount as currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Inline CSS Styles
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        header: {
            marginBottom: '20px',
            borderBottom: '2px solid #ddd',
            paddingBottom: '10px',
        },
        headerTitle: {
            fontSize: '24px',
            margin: '0',
            color: '#333',
        },
        details: {
            marginBottom: '20px',
        },
        detailRow: {
            marginBottom: '10px',
            paddingLeft: '10px',
            fontSize: '16px',
            color: '#333',
        },
        footer: {
            textAlign: 'center',
            fontSize: '14px',
            color: '#777',
            marginTop: '20px',
            paddingTop: '10px',
            borderTop: '2px solid #ddd',
        },
        strong: {
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            data && data.map((d, key) =>
            <div style={styles.header}>
                <h2 style={styles.headerTitle}>Flight Booking Invoice</h2>
                <p><span style={styles.strong}>Flight Name:</span> {flight_name}</p>
                <p><span style={styles.strong}>Room Type:</span> {seattype}</p>

            </div>

            <div style={styles.details}>
                <div style={styles.detailRow}>
                    <p><span style={styles.strong}>Number of Rooms:</span> {number_of_seat}</p>
                </div>
                <div style={styles.detailRow}>
                    <p><span style={styles.strong}>Number of Guests (Adults):</span> {number_of_guest_adult}</p>
                </div>
                <div style={styles.detailRow}>
                    <p><span style={styles.strong}>Number of Guests (Children):</span> {number_of_guest_child}</p>
                </div>
                <div style={styles.detailRow}>
                    <p><span style={styles.strong}>Total Amount:</span> {formatCurrency(total_amount)}</p>
                </div>
            </div>
            )

            <div style={styles.footer}>
                <p>Thank you for booking with us!</p>
            </div>
        </div>
    );
}

export default FlightInvoice;
