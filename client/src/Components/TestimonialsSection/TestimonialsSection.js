import React, { Component } from 'react';
import './TestimonialsSection.css'; // same CSS works!

class TestimonialsSection extends Component {
  state = {
   testimonials: [
  {
    id: 1,
    name: 'Liam Walker',
    comment: 'Steady profits every day — very trustworthy platform.',
    location: 'USA',
    image: 'https://ui-avatars.com/api/?name=Liam+Walker&background=random&rounded=true'
  },
  {
    id: 2,
    name: 'Ama Boateng',
    comment: 'Easy withdrawals via MoMo and local banks and Bitcoin — love it!',
    location: 'Ghana',
    image: 'https://ui-avatars.com/api/?name=Ama+Boateng&background=random&rounded=true'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    comment: 'Simple dashboard and great returns.',
    location: 'Canada',
    image: 'https://ui-avatars.com/api/?name=Michael+Johnson&background=random&rounded=true'
  },
  {
    id: 4,
    name: 'Sophia Williams',
    comment: 'Fast payouts, great support team!',
    location: 'UK',
    image: 'https://ui-avatars.com/api/?name=Sophia+Williams&background=random&rounded=true'
  },
  {
    id: 5,
    name: 'James Brown',
    comment: 'I can track my profits in real time. Amazing!',
    location: 'Australia',
    image: 'https://ui-avatars.com/api/?name=James+Brown&background=random&rounded=true'
  },
  {
    id: 6,
    name: 'Olivia Jones',
    comment: 'This platform has transformed my side income.',
    location: 'New Zealand',
    image: 'https://ui-avatars.com/api/?name=Olivia+Jones&background=random&rounded=true'
  },
  {
    id: 7,
    name: 'David Miller',
    comment: 'Very professional team, transparent and secure.',
    location: 'Ireland',
    image: 'https://ui-avatars.com/api/?name=David+Miller&background=random&rounded=true'
  },
  {
    id: 8,
    name: 'Ava Davis',
    comment: 'Good customer care and fast transactions.',
    location: 'South Africa',
    image: 'https://ui-avatars.com/api/?name=Ava+Davis&background=random&rounded=true'
  },
  {
    id: 9,
    name: 'Daniel Wilson',
    comment: 'One of the best mining platforms I’ve used so far.',
    location: 'Nigeria',
    image: 'https://ui-avatars.com/api/?name=Daniel+Wilson&background=random&rounded=true'
  },
  {
    id: 10,
    name: 'Mia Moore',
    comment: 'Easy to invest and very clear earnings report.',
    location: 'Kenya',
    image: 'https://ui-avatars.com/api/?name=Mia+Moore&background=random&rounded=true'
  },
  {
    id: 11,
    name: 'Christopher Taylor',
    comment: 'Secure, stable profits and simple to use.',
    location: 'Germany',
    image: 'https://ui-avatars.com/api/?name=Christopher+Taylor&background=random&rounded=true'
  },
  {
    id: 12,
    name: 'Amelia Anderson',
    comment: 'Real mining profits daily — no hidden fees.',
    location: 'Netherlands',
    image: 'https://ui-avatars.com/api/?name=Amelia+Anderson&background=random&rounded=true'
  },
  {
    id: 13,
    name: 'Matthew Thomas',
    comment: 'Very happy with my returns so far.',
    location: 'France',
    image: 'https://ui-avatars.com/api/?name=Matthew+Thomas&background=random&rounded=true'
  },
  {
    id: 14,
    name: 'Charlotte Jackson',
    comment: 'Trustworthy and good ROI for new users.',
    location: 'Italy',
    image: 'https://ui-avatars.com/api/?name=Charlotte+Jackson&background=random&rounded=true'
  },
  {
    id: 15,
    name: 'Joshua White',
    comment: 'I recommend it to anyone who wants passive income!',
    location: 'Spain',
    image: 'https://ui-avatars.com/api/?name=Joshua+White&background=random&rounded=true'
  },
  {
    id: 16,
    name: 'Isabella Harris',
    comment: 'Investing has never been this simple and secure.',
    location: 'UAE',
    image: 'https://ui-avatars.com/api/?name=Isabella+Harris&background=random&rounded=true'
  },
  {
    id: 17,
    name: 'Ethan Martin',
    comment: 'Transparent earnings and instant withdrawals!',
    location: 'Singapore',
    image: 'https://ui-avatars.com/api/?name=Ethan+Martin&background=random&rounded=true'
  },
  {
    id: 18,
    name: 'Abigail Thompson',
    comment: 'I feel confident about my investment here.',
    location: 'India',
    image: 'https://ui-avatars.com/api/?name=Abigail+Thompson&background=random&rounded=true'
  },
  {
    id: 19,
    name: 'Alexander Garcia',
    comment: 'This is the future of bitcoin mining investment!',
    location: 'Mexico',
    image: 'https://ui-avatars.com/api/?name=Alexander+Garcia&background=random&rounded=true'
  },
  {
    id: 20,
    name: 'Harper Martinez',
    comment: 'Highly recommend for secure passive income.',
    location: 'Brazil',
    image: 'https://ui-avatars.com/api/?name=Harper+Martinez&background=random&rounded=true'
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
                <div className="testimonial__location">{item.location}</div> {/* ✅ NEW country/location line */}
                <div className="testimonial__comment">"{item.comment}"</div>
                </div>
            ))}
         </div>

        </div>

    );
  }
}

export default TestimonialsSection;
