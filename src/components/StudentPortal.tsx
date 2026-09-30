import React, { useState } from 'react';
import { Student, TermReport } from '../types';
import { SCHOOL_INFO, INITIAL_STUDENTS, MOCK_TERM_REPORT, TIMETABLE_SAMPLE } from '../data/mockData';
import { 
  GraduationCap, 
  Printer, 
  Download, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Award, 
  FileText, 
  User, 
  Shield, 
  BookOpen, 
  Activity,
  AlertCircle,
  Search,
  CheckCircle2
} from 'lucide-react';

interface StudentPortalProps {
  onNavigateToFees: (admissionNo?: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ onNavigateToFees }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student>(INITIAL_STUDENTS[0]);
  const [searchAdm, setSearchAdm] = useState('');
  const [activeTab, setActiveTab] = useState<'report' | 'timetable' | 'attendance' | 'resources'>('report');
  const [reportData, setReportData] = useState<TermReport>(MOCK_TERM_REPORT);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchAdm.trim()) return;
    const found = INITIAL_STUDENTS.find(s => 
      s.admissionNo.toLowerCase().includes(searchAdm.trim().toLowerCase()) ||
      s.fullName.toLowerCase().includes(searchAdm.trim().toLowerCase())
    );
    if (found) {
      setSelectedStudent(found);
      setSearchMessage(null);
    } else {
      setSearchMessage(`No student record found matching "${searchAdm}". Try selecting one of the enrolled demo students below.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (grade.startsWith('B')) return 'text-sky-700 bg-sky-50 border-sky-200';
    if (grade.startsWith('C')) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Portal Header */}
      <div className="no-print bg-stone-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-800 text-amber-300 text-xs font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>NEMIS & KNEC Synced Student Information System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display">
              Student & Parent Academic Portal
            </h1>
            <p className="text-stone-300 text-sm max-w-2xl font-sans">
              Access authenticated termly report cards, KNEC continuous assessment marks, lesson schedules, and fee balance reconciliations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-700" />
              <span>Print Official Report</span>
            </button>
            <button
              onClick={() => onNavigateToFees(selectedStudent.admissionNo)}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-rose-800 hover:bg-rose-700 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Pay Fees for this Student</span>
            </button>
          </div>
        </div>

        {/* Heraldic Kenyan Colors Ribbon */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="w-1/3 bg-black"></div>
          <div className="w-1/3 bg-rose-700"></div>
          <div className="w-1/3 bg-emerald-700"></div>
        </div>
      </div>

      {/* Student Selector & Switcher Bar */}
      <div className="no-print bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              Active Student Record
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {INITIAL_STUDENTS.map((student) => (
                <button
                  key={student.id}
                  onClick={() => {
                    setSelectedStudent(student);
                    setSearchMessage(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    selectedStudent.id === student.id
                      ? 'bg-rose-950 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{student.fullName} ({student.admissionNo})</span>
                  <span className="opacity-75 text-[11px]">Form {student.form}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Adm No (e.g. 3412)..."
                value={searchAdm}
                onChange={(e) => setSearchAdm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-rose-900 bg-stone-50"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium text-white bg-stone-800 hover:bg-stone-900 rounded-lg cursor-pointer"
            >
              Verify
            </button>
          </form>
        </div>

        {searchMessage && (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{searchMessage}</span>
          </div>
        )}
      </div>

      {/* Selected Student Profile Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-4 md:col-span-2">
            <div className="w-16 h-16 rounded-full bg-rose-950 text-amber-400 border-2 border-amber-500/40 flex items-center justify-center font-display font-bold text-xl shrink-0 shadow-inner">
              {selectedStudent.fullName.charAt(0)}{selectedStudent.fullName.split(' ')[1]?.charAt(0) || 'S'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-stone-900 font-display">
                  {selectedStudent.fullName}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-rose-100 text-rose-900 rounded">
                  Form {selectedStudent.form} {selectedStudent.stream}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono">
                Admission No: <strong className="text-stone-900">{selectedStudent.admissionNo}</strong> · {selectedStudent.house}
              </p>
              <p className="text-xs text-stone-600">
                Class Teacher: {selectedStudent.classTeacher}
              </p>
            </div>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-stone-100 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Fee Balance Status</span>
            <div className="text-xl font-bold font-mono">
              {selectedStudent.currentTermBalance === 0 ? (
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> KES 0.00 (Cleared)
                </span>
              ) : (
                <span className="text-rose-900">
                  KES {selectedStudent.currentTermBalance.toLocaleString()}
                </span>
              )}
            </div>
            <button
              onClick={() => onNavigateToFees(selectedStudent.admissionNo)}
              className="text-xs text-rose-800 font-semibold hover:underline block cursor-pointer"
            >
              {selectedStudent.currentTermBalance === 0 ? 'View Payment Receipts' : 'Pay Online via M-Pesa'}
            </button>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-stone-100 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Term 1 Attendance</span>
            <div className="text-xl font-bold text-stone-900 font-mono tabular-nums">
              {selectedStudent.attendanceRate}%
            </div>
            <p className="text-xs text-emerald-700">Excellent Standing (No Exeat Infractions)</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="no-print flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('report')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'report'
              ? 'bg-white border-t border-x border-stone-200 text-rose-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>KCSE Terminal Report Card</span>
        </button>

        <button
          onClick={() => setActiveTab('timetable')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'timetable'
              ? 'bg-white border-t border-x border-stone-200 text-rose-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Weekly Timetable</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'attendance'
              ? 'bg-white border-t border-x border-stone-200 text-rose-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Attendance & Discipline</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'resources'
              ? 'bg-white border-t border-x border-stone-200 text-rose-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Revision & E-Learning</span>
        </button>
      </div>

      {/* TAB 1: KCSE Terminal Report Card */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8" id="printable-report">
          {/* Institutional Letterhead on Report Card */}
          <div className="text-center pb-6 border-b-2 border-stone-900 space-y-2">
            <div className="flex justify-center items-center gap-3">
              <GraduationCap className="w-8 h-8 text-rose-950" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide font-display text-stone-950">
                  {SCHOOL_INFO.name}
                </h2>
                <p className="text-xs uppercase tracking-widest text-stone-600">
                  {SCHOOL_INFO.subTitle}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-500 font-mono">
              KNEC Centre: {SCHOOL_INFO.knecCode} · NEMIS: {SCHOOL_INFO.nemisCode} · {SCHOOL_INFO.postalAddress}
            </p>
            <div className="inline-block bg-stone-900 text-white text-xs px-4 py-1 rounded font-semibold uppercase tracking-wider mt-2">
              Official Terminal Academic Performance Report Form · Term 1, 2026
            </div>
          </div>

          {/* Student Dossier Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-lg text-xs border border-stone-200">
            <div>
              <span className="text-stone-500 block">Student Name:</span>
              <strong className="text-stone-900">{selectedStudent.fullName}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Admission Number:</span>
              <strong className="text-stone-900 font-mono">{selectedStudent.admissionNo}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Class & Stream:</span>
              <strong className="text-stone-900">Form {selectedStudent.form} {selectedStudent.stream}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Dormitory House:</span>
              <strong className="text-stone-900">{selectedStudent.house}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">KCPE Entry Marks:</span>
              <strong className="text-stone-900 font-mono">{selectedStudent.kcpeMarks} / 500</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Stream Position:</span>
              <strong className="text-stone-900 font-mono">{reportData.streamRank} out of {reportData.streamTotal}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Overall Form Position:</span>
              <strong className="text-stone-900 font-mono">{reportData.overallRank} out of {reportData.overallTotal}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Mean Score / Points:</span>
              <strong className="text-rose-950 font-bold font-mono">{reportData.meanScore}% · {reportData.totalPoints} Points ({reportData.meanGrade})</strong>
            </div>
          </div>

          {/* Subject Performance Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-900 text-white font-medium">
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Subject Name</th>
                  <th className="py-2.5 px-3 text-center">Score (%)</th>
                  <th className="py-2.5 px-3 text-center">Grade</th>
                  <th className="py-2.5 px-3 text-center">KNEC Points</th>
                  <th className="py-2.5 px-3">Teacher's Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {reportData.subjects.map((subj) => (
                  <tr key={subj.code} className="hover:bg-stone-50">
                    <td className="py-2.5 px-3 font-mono text-stone-500">{subj.code}</td>
                    <td className="py-2.5 px-3 font-semibold text-stone-900">{subj.name}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold">{subj.score}%</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded font-bold border ${getGradeColor(subj.grade)}`}>
                        {subj.grade}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold">{subj.points}</td>
                    <td className="py-2.5 px-3 text-stone-600 italic">{subj.teacherRemarks}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-stone-100 font-bold text-stone-900 border-t-2 border-stone-300">
                  <td colSpan={2} className="py-3 px-3 uppercase">Aggregate KCSE Assessment Total</td>
                  <td className="py-3 px-3 text-center font-mono text-sm">{reportData.meanScore}%</td>
                  <td className="py-3 px-3 text-center text-sm text-rose-950">{reportData.meanGrade}</td>
                  <td className="py-3 px-3 text-center font-mono text-sm">{reportData.totalPoints} / 84</td>
                  <td className="py-3 px-3 text-stone-500 font-normal">Rank: {reportData.overallRank} of {reportData.overallTotal} students</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Teacher and Principal Endorsement Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Class Teacher's Remark:</span>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                "{reportData.classTeacherComment}"
              </p>
              <div className="pt-4 flex items-center justify-between text-xs text-stone-500 border-t border-stone-200">
                <span>{selectedStudent.classTeacher}</span>
                <span className="font-mono">Signature: [Verified]</span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Chief Principal's Certification:</span>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                "{reportData.principalComment}"
              </p>
              <div className="pt-4 flex items-center justify-between text-xs text-stone-500 border-t border-stone-200">
                <span>{SCHOOL_INFO.principalName}</span>
                <span className="text-rose-950 font-semibold">Official Rubber Seal</span>
              </div>
            </div>
          </div>

          {/* Term Dates & Instructions */}
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-rose-950">Next Term Opening Date: {reportData.openingDate}</p>
              <p className="text-stone-600">Students must report in full school uniform before 4:00 PM with Term 2 fee payment confirmation slip.</p>
            </div>
            <div className="shrink-0 no-print">
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-950 hover:bg-rose-900 rounded-lg cursor-pointer"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Weekly Timetable */}
      {activeTab === 'timetable' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-display text-stone-900">
                Form {selectedStudent.form} {selectedStudent.stream} Official Timetable
              </h3>
              <p className="text-xs text-stone-500">Term 1, 2026 Academic Master Schedule · 45-Minute Lesson Blocks</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md flex items-center gap-1.5 self-start cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200">
              <thead className="bg-stone-900 text-white">
                <tr>
                  <th className="py-2.5 px-3 border border-stone-800">Time / Period</th>
                  <th className="py-2.5 px-3 border border-stone-800">Monday</th>
                  <th className="py-2.5 px-3 border border-stone-800">Tuesday</th>
                  <th className="py-2.5 px-3 border border-stone-800">Wednesday</th>
                  <th className="py-2.5 px-3 border border-stone-800">Thursday</th>
                  <th className="py-2.5 px-3 border border-stone-800">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {TIMETABLE_SAMPLE.map((row, idx) => {
                  const isBreak = row.period.includes('Break') || row.period.includes('Lunch');
                  return (
                    <tr key={idx} className={isBreak ? 'bg-amber-50/70 font-semibold text-stone-700' : 'hover:bg-stone-50'}>
                      <td className="py-2 px-3 border border-stone-200 font-mono text-stone-600 whitespace-nowrap">
                        {row.period}
                      </td>
                      <td className="py-2 px-3 border border-stone-200">{row.mon}</td>
                      <td className="py-2 px-3 border border-stone-200">{row.tue}</td>
                      <td className="py-2 px-3 border border-stone-200">{row.wed}</td>
                      <td className="py-2 px-3 border border-stone-200">{row.thu}</td>
                      <td className="py-2 px-3 border border-stone-200">{row.fri}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Attendance & Discipline */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-display text-stone-900">
              Attendance & Pastoral Conduct Dossier
            </h3>
            <p className="text-xs text-stone-500">Official registry maintained by Deputy Principal (Administration)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
              <span className="text-xs uppercase text-stone-500 font-medium">Days Present in Term 1</span>
              <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums">48 / 49 Days</div>
              <p className="text-xs text-emerald-700">98.4% Regularity</p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
              <span className="text-xs uppercase text-stone-500 font-medium">Exeat Passes Issued</span>
              <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums">1 Pass</div>
              <p className="text-xs text-stone-500">Official medical appointment (Certified)</p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
              <span className="text-xs uppercase text-stone-500 font-medium">Merit & Character Score</span>
              <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">Grade A (Exemplary)</div>
              <p className="text-xs text-stone-500">Science Club Assistant Secretary</p>
            </div>
          </div>

          <div className="border border-stone-200 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-bold text-stone-900">Boarding House Master Remark ({selectedStudent.house})</h4>
            <p className="text-xs text-stone-600 leading-relaxed italic">
              "{selectedStudent.fullName} exhibits exemplary hygiene and adheres rigorously to dormitory quiet hours. Actively leads junior students during morning prep and dorm inspections."
            </p>
            <div className="pt-2 text-xs text-stone-500 border-t border-stone-100 flex items-center justify-between">
              <span>House Master: Mr. S. Kilonzo</span>
              <span className="text-emerald-700 font-medium">Status: Clean Record</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Revision & E-Learning */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-display text-stone-900">
              Departmental Revision Packs & Syllabi
            </h3>
            <p className="text-xs text-stone-500">Curated materials prepared by Nduluni High School Academic Faculty</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Form 3 Mathematics Paper 1 & 2 Revision Dossier", size: "2.4 MB", dept: "Mathematics", term: "Term 1 2026" },
              { title: "Physics Kinematics & Mechanics Formula Handbook", size: "1.8 MB", dept: "Sciences", term: "Term 1 2026" },
              { title: "KCSE Chemistry Practical Qualitative Analysis Guide", size: "3.1 MB", dept: "Sciences", term: "Term 1 2026" },
              { title: "English Paper 2 Comprehension & Literary Essays Notes", size: "1.5 MB", dept: "Languages", term: "Term 1 2026" }
            ].map((res, i) => (
              <div key={i} className="p-4 border border-stone-200 rounded-lg flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-900">{res.title}</h4>
                  <p className="text-[11px] text-stone-500">{res.dept} · {res.term} · {res.size}</p>
                </div>
                <button 
                  onClick={() => alert(`Downloading "${res.title}"...`)}
                  className="px-3 py-1.5 text-xs font-medium text-rose-900 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
