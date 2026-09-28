export const getId = (value) => {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return value.id || value._id || undefined;
  return String(value);
};

export const toISODate = (value) => {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  return undefined;
};

export const toNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === '') return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export const trimOrUndefined = (value) => {
  if (typeof value !== 'string') return undefined;
  const t = value.trim();
  return t.length ? t : undefined;
};

export const cleanPayload = (obj) => {
  const out = {};
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) out[k] = v;
    else if (typeof v === 'object' && !(v instanceof Date)) out[k] = v;
    else out[k] = v;
  });
  return out;
};

export const buildStudentPayload = (form) => ({
  firstName: form.firstName?.trim(),
  lastName: form.lastName?.trim(),
  rollNo: String(form.rollNo || Date.now()).slice(-10),
  dateOfBirth: toISODate(form.dateOfBirth),
  gender: (form.gender || 'other').toLowerCase(),
  class: getId(form.class || form.classId),
  guardian: {
    name: form.guardianName?.trim() || form.guardian?.name?.trim(),
    phone: form.guardianPhone?.trim() || form.guardian?.phone?.trim(),
  },
  email: trimOrUndefined(form.email),
  phone: trimOrUndefined(form.phone),
  section: trimOrUndefined(form.section),
  bloodGroup: trimOrUndefined(form.bloodGroup),
  status: form.status || 'active',
});

export const buildTeacherPayload = (form) => ({
  firstName: form.firstName?.trim(),
  lastName: form.lastName?.trim(),
  email: form.email?.trim(),
  phone: form.phone?.trim(),
  qualification: form.qualification?.trim(),
  salary: toNumber(form.salary, 0),
  specialization: Array.isArray(form.specialization)
    ? form.specialization
    : typeof form.specialization === 'string'
      ? form.specialization.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
  experience: toNumber(form.experience, 0),
  gender: form.gender ? String(form.gender).toLowerCase() : undefined,
  bio: trimOrUndefined(form.bio),
  joiningDate: toISODate(form.joiningDate),
});

export const buildClassPayload = (form) => ({
  name: form.name?.trim(),
  section: form.section?.trim(),
  academicYear: form.academicYear?.trim(),
  capacity: toNumber(form.capacity, 40),
  classTeacher: getId(form.classTeacher),
  subjects: Array.isArray(form.subjects) ? form.subjects.map(getId) : [],
  room: trimOrUndefined(form.room),
  schedule: trimOrUndefined(form.schedule),
});

export const buildSubjectPayload = (form) => ({
  code: String(form.code || '').trim().toUpperCase(),
  name: form.name?.trim(),
  description: trimOrUndefined(form.description),
  credits: toNumber(form.credits, 1),
  type: form.type || 'core',
});

export const buildExamPayload = (form) => ({
  name: form.name?.trim(),
  type: form.type || 'midterm',
  class: getId(form.class || form.classId),
  academicYear: form.academicYear?.trim(),
  startDate: toISODate(form.startDate),
  endDate: toISODate(form.endDate),
  description: trimOrUndefined(form.description),
});

export const buildAnnouncementPayload = (form) => ({
  title: form.title?.trim(),
  message: form.message?.trim(),
  category: form.category || 'general',
  priority: form.priority || 'normal',
  audience: form.audience || 'all',
  targetClasses: form.audience === 'class'
    ? (Array.isArray(form.targetClasses) ? form.targetClasses.map(getId) : [])
    : [],
  pinned: Boolean(form.pinned),
  publishAt: toISODate(form.publishAt) || new Date().toISOString(),
  expiresAt: toISODate(form.expiresAt),
});

export const buildFeeStructurePayload = (form) => ({
  name: form.name?.trim(),
  class: getId(form.class || form.classId),
  academicYear: form.academicYear?.trim(),
  items: Array.isArray(form.items)
    ? form.items.map((it) => ({
        name: it.name?.trim(),
        amount: toNumber(it.amount, 0),
        frequency: it.frequency || 'monthly',
      }))
    : [],
  dueDay: toNumber(form.dueDay, 5),
  lateFee: toNumber(form.lateFee, 0),
});

export const buildFeePaymentPayload = (form) => ({
  student: getId(form.student),
  class: getId(form.class || form.classId),
  feeStructure: getId(form.feeStructure),
  academicYear: form.academicYear?.trim(),
  amountDue: toNumber(form.amountDue, 0),
  dueDate: toISODate(form.dueDate),
  month: form.month ? toNumber(form.month) : undefined,
});

export const buildAttendancePayload = (cls, date, records) => ({
  class: getId(cls),
  date: toISODate(date),
  records: Array.isArray(records)
    ? records.map((r) => ({
        student: getId(r.student || r.studentId || r.id),
        status: r.status,
        note: trimOrUndefined(r.note),
      }))
    : [],
});
