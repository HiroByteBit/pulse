import { subDays, addDays, format, setHours, setMinutes } from 'date-fns';

export const staff = [
  { id: 'd1', name: 'Dr. Sarah Chen', role: 'Physician', specialty: 'Cardiology', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200', patients: 124 },
  { id: 'd2', name: 'Dr. James Wilson', role: 'Physician', specialty: 'Endocrinology', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200', patients: 98 },
  { id: 'd3', name: 'Dr. Elena Rodriguez', role: 'Physician', specialty: 'Pediatrics', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200', patients: 112 },
  { id: 'd4', name: 'Dr. Marcus Thorne', role: 'Physician', specialty: 'General Practice', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200', patients: 145 },
  { id: 'n1', name: 'Nurse Emily Blunt', role: 'Nurse', specialty: 'Triage', avatar: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=200', patients: 0 },
  { id: 'n2', name: 'Nurse David Park', role: 'Nurse', specialty: 'Patient Care', avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f0871?auto=format&fit=crop&q=80&w=200', patients: 0 },
];

const generateVitalsHistory = (baseVitals) => {
  return Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), 29 - i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      heartRate: baseVitals.heartRate + Math.floor(Math.random() * 10 - 5),
      systolic: baseVitals.systolic + Math.floor(Math.random() * 14 - 7),
      diastolic: baseVitals.diastolic + Math.floor(Math.random() * 10 - 5),
      spo2: Math.min(100, baseVitals.spo2 + Math.floor(Math.random() * 3 - 1)),
      temperature: Number((baseVitals.temperature + (Math.random() * 0.6 - 0.3)).toFixed(1)),
      glucose: baseVitals.glucose + Math.floor(Math.random() * 20 - 10),
      weight: Number((baseVitals.weight + (Math.random() * 0.4 - 0.2)).toFixed(1)),
    };
  });
};

const patientAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200',
];

const realisticNames = [
  'Robert Miller', 'Sarah Jones', 'Michael Brown', 'Emily Davis', 'William Taylor',
  'Olivia Martinez', 'David Anderson', 'Sophia Thomas', 'Joseph Hernandez', 'Isabella Moore',
  'Christopher Martin', 'Charlotte Jackson', 'Daniel Thompson', 'Amelia Garcia', 'Matthew White',
  'Mia Lopez', 'Andrew Lee', 'Harper Gonzalez', 'Joshua Harris', 'Evelyn Clark',
  'Nathan Lewis', 'Grace Robinson', 'Samuel Walker', 'Chloe Young'
];

export const patients = [
  {
    id: 'p1',
    name: 'James Wilson',
    avatar: patientAvatars[0],
    dob: '1975-05-12',
    age: 51,
    gender: 'Male',
    bloodType: 'A+',
    phone: '(555) 123-4567',
    email: 'j.wilson@email.com',
    address: '742 Evergreen Terrace, Springfield',
    insurance: 'Blue Shield PPO',
    primaryDoctor: staff[0],
    status: 'critical',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: [{ name: 'Lisinopril', dose: '10mg', frequency: 'Once daily' }, { name: 'Metformin', dose: '500mg', frequency: 'Twice daily' }],
    allergies: ['Penicillin'],
    lastVisit: subDays(new Date(), 4),
    nextAppointment: addDays(new Date(), 2),
    vitals: { heartRate: 102, systolic: 165, diastolic: 98, spo2: 91, temperature: 99.2, glucose: 210, weight: 88.5 },
    vitalsHistory: generateVitalsHistory({ heartRate: 98, systolic: 158, diastolic: 95, spo2: 92, temperature: 98.6, glucose: 200, weight: 88 }),
    notes: [{ doctor: 'Dr. Sarah Chen', date: subDays(new Date(), 4), text: 'Patient reports dizziness. Adjusted Lisinopril dose.' }],
    labResults: [{ test: 'A1C', date: subDays(new Date(), 10), result: '7.8%', range: '4.0-5.6%', flag: 'High' }]
  },
  {
    id: 'p2',
    name: 'Maria Chen',
    avatar: patientAvatars[1],
    dob: '1988-11-24',
    age: 37,
    gender: 'Female',
    bloodType: 'O-',
    phone: '(555) 987-6543',
    email: 'm.chen@email.com',
    address: '123 Maple St, Oakville',
    insurance: 'Aetna Select',
    primaryDoctor: staff[1],
    status: 'monitoring',
    conditions: ['Asthma'],
    medications: [{ name: 'Albuterol', dose: '90mcg', frequency: 'As needed' }],
    allergies: ['Latex', 'Peanuts'],
    lastVisit: subDays(new Date(), 12),
    nextAppointment: addDays(new Date(), 5),
    vitals: { heartRate: 78, systolic: 122, diastolic: 82, spo2: 96, temperature: 98.4, glucose: 95, weight: 62.0 },
    vitalsHistory: generateVitalsHistory({ heartRate: 75, systolic: 120, diastolic: 80, spo2: 97, temperature: 98.6, glucose: 90, weight: 62 }),
    notes: [],
    labResults: []
  },
  // Add more patients to reach 24...
  ...Array.from({ length: 22 }).map((_, i) => {
    const id = `p${i + 3}`;
    const status = i < 2 ? 'critical' : i < 6 ? 'monitoring' : i < 20 ? 'active' : 'discharged';
    const baseVitals = {
      heartRate: 60 + Math.floor(Math.random() * 40),
      systolic: 110 + Math.floor(Math.random() * 50),
      diastolic: 70 + Math.floor(Math.random() * 30),
      spo2: 94 + Math.floor(Math.random() * 6),
      temperature: 97.5 + (Math.random() * 3),
      glucose: 80 + Math.floor(Math.random() * 120),
      weight: 50 + Math.floor(Math.random() * 60)
    };
    return {
      id,
      name: realisticNames[i % realisticNames.length],
      avatar: patientAvatars[(i + 2) % patientAvatars.length],
      dob: '1980-01-01',
      age: 44,
      gender: i % 2 === 0 ? 'Female' : 'Male',
      bloodType: 'B+',
      phone: '(555) 000-0000',
      email: `patient${i+3}@email.com`,
      address: '123 Main St',
      insurance: 'Unity Health',
      primaryDoctor: staff[i % 4],
      status,
      conditions: i % 3 === 0 ? ['Arthritis'] : [],
      medications: [],
      allergies: [],
      lastVisit: subDays(new Date(), 10 + i),
      nextAppointment: i % 2 === 0 ? addDays(new Date(), i + 1) : null,
      vitals: baseVitals,
      vitalsHistory: generateVitalsHistory(baseVitals),
      notes: [],
      labResults: []
    };
  })
];

export const appointments = [
  { 
    id: 'a1', 
    patient: patients[0], 
    doctor: staff[0], 
    date: new Date(), 
    time: '09:00', 
    duration: 30, 
    type: 'Follow-up', 
    status: 'in_progress',
    notes: 'Checking hypertension medication efficacy.'
  },
  { 
    id: 'a2', 
    patient: patients[1], 
    doctor: staff[1], 
    date: new Date(), 
    time: '10:30', 
    duration: 15, 
    type: 'Checkup', 
    status: 'scheduled',
    notes: 'Annual physical.'
  },
  // Add more...
  ...Array.from({ length: 33 }).map((_, i) => {
    const date = addDays(new Date(), Math.floor(i / 3));
    const hours = 9 + (i % 8);
    return {
      id: `a${i + 3}`,
      patient: patients[i % 24],
      doctor: staff[i % 4],
      date,
      time: `${hours.toString().padStart(2, '0')}:00`,
      duration: 30,
      type: i % 5 === 0 ? 'Emergency' : 'Checkup',
      status: 'scheduled',
      notes: 'Standard visit.'
    };
  })
];

export const alerts = [
  { id: 'al1', severity: 'critical', patient: patients[0], message: `${patients[0].name}'s SpO2 dropped to 91% — Critical`, time: new Date(), resolved: false },
  { id: 'al2', severity: 'warning', patient: patients[1], message: `${patients[1].name} missed morning medication — Warning`, time: subDays(new Date(), 0.1), resolved: false },
  { id: 'al3', severity: 'info', patient: patients[2], message: "Lab results ready for 3 patients — Info", time: subDays(new Date(), 0.2), resolved: false },
  { id: 'al4', severity: 'critical', patient: patients[3], message: `${patients[3].name}: High Heart Rate (115 bpm)`, time: subDays(new Date(), 0.05), resolved: false },
  { id: 'al5', severity: 'warning', patient: patients[4], message: `${patients[4].name}: Follow-up needed for blood work`, time: subDays(new Date(), 0.3), resolved: false },
];

export const clinicStats = {
  totalPatients: 248,
  newThisMonth: 18,
  appointmentsToday: 12,
  criticalPatients: 3,
  avgWaitTime: "14 min",
  bedOccupancy: 73,
  revenueMTD: 48200,
  revenueChange: 12.3
};

export const diagnosisBreakdown = [
  { name: 'Diabetes', value: 45 },
  { name: 'Hypertension', value: 38 },
  { name: 'Asthma', value: 25 },
  { name: 'Heart Disease', value: 20 },
  { name: 'Arthritis', value: 15 },
  { name: 'Other', value: 12 },
];

export const patientStatusDistribution = [
  { name: 'Active', value: 65, fill: '#10b981' },
  { name: 'Monitoring', value: 20, fill: '#f59e0b' },
  { name: 'Critical', value: 10, fill: '#ef4444' },
  { name: 'Discharged', value: 5, fill: '#64748b' },
];
