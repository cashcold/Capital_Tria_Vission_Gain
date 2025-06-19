import React, { Component } from 'react';
import './TestimonialsSection.css'; // same CSS works!

class TestimonialsSection extends Component {
  state = {
  testimonials: [
    {
        id: 1,
        name: 'Liam Walker',
        comment: 'Steady profits every day — very trustworthy platform.',
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: 2,
        name: 'Emily Smith',
        comment: 'Easy withdrawals via MoMo and local banks and Bitcoin — love it!',
        image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
        id: 3,
        name: 'Michael Johnson',
        comment: 'Simple dashboard and great returns.',
        image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
        id: 4,
        name: 'Sophia Williams',
        comment: 'Fast payouts, great support team!',
        image: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
        id: 5,
        name: 'James Brown',
        comment: 'I can track my profits in real time. Amazing!',
        image: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
        id: 6,
        name: 'Olivia Jones',
        comment: 'This platform has transformed my side income.',
        image: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
        id: 7,
        name: 'David Miller',
        comment: 'Very professional team, transparent and secure.',
        image: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
        id: 8,
        name: 'Ava Davis',
        comment: 'Good customer care and fast transactions.',
        image: 'https://randomuser.me/api/portraits/women/8.jpg'
    },
    {
        id: 9,
        name: 'Daniel Wilson',
        comment: 'One of the best mining platforms I’ve used so far.',
        image: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
        id: 10,
        name: 'Mia Moore',
        comment: 'Easy to invest and very clear earnings report.',
        image: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    {
        id: 11,
        name: 'Christopher Taylor',
        comment: 'Secure, stable profits and simple to use.',
        image: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    {
        id: 12,
        name: 'Amelia Anderson',
        comment: 'Real mining profits daily — no hidden fees.',
        image: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    {
        id: 13,
        name: 'Matthew Thomas',
        comment: 'Very happy with my returns so far.',
        image: 'https://randomuser.me/api/portraits/men/13.jpg'
    },
    {
        id: 14,
        name: 'Charlotte Jackson',
        comment: 'Trustworthy and good ROI for new users.',
        image: 'https://randomuser.me/api/portraits/women/14.jpg'
    },
    {
        id: 15,
        name: 'Joshua White',
        comment: 'I recommend it to anyone who wants passive income!',
        image: 'https://randomuser.me/api/portraits/men/15.jpg'
    },
    {
        id: 16,
        name: 'Isabella Harris',
        comment: 'Investing has never been this simple and secure.',
        image: 'https://randomuser.me/api/portraits/women/16.jpg'
    },
    {
        id: 17,
        name: 'Ethan Martin',
        comment: 'Transparent earnings and instant withdrawals!',
        image: 'https://randomuser.me/api/portraits/men/17.jpg'
    },
    {
        id: 18,
        name: 'Abigail Thompson',
        comment: 'I feel confident about my investment here.',
        image: 'https://randomuser.me/api/portraits/women/18.jpg'
    },
    {
        id: 19,
        name: 'Alexander Garcia',
        comment: 'This is the future of bitcoin mining investment!',
        image: 'https://randomuser.me/api/portraits/men/19.jpg'
    },
    {
        id: 20,
        name: 'Harper Martinez',
        comment: 'Highly recommend for secure passive income.',
        image: 'https://randomuser.me/api/portraits/women/20.jpg'
    }
    ]

  };

  render() {
    return (
      <div className="testimonials">
        <h1>What Our Members Say</h1>
        <div className="testimonials__grid">
            {this.state.testimonials.map(item => (
            <div className="testimonial__card" key={item.id}>
                <img src={item.image} alt={item.name} className="testimonial__avatar" />
                <div className="testimonial__name">{item.name}</div>
                <div className="testimonial__comment">"{item.comment}"</div>
            </div>
            ))}
        </div>
        </div>

    );
  }
}

export default TestimonialsSection;
