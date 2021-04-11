from app import db

class Person(db.Model): 
    __tablename__ = 'person'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    contacts = db.relationship('Contact', backref='person', lazy=True)

    def __repr__(self): 
        return '<User %r>' % self.username

class Contact(db.Model): 
    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    emails = db.Column(db.String(30), nullable=False)
    priorityLevel = db.Column(db.Integer, nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)

    def __repr__(self): 
        return '<Contact %r>' % self.name