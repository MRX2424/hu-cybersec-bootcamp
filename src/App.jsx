import React, { useState } from 'react';
import { Shield, Terminal, Lock, AlertTriangle, FileText, Code, CheckCircle, Circle, Menu, X, ChevronRight, ExternalLink, Search, Database, Key, Settings, Users, ArrowUp } from 'lucide-react';

const CyberSecurityBootcamp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  const toggleLesson = (lessonId) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const courses = [
    {
      id: 'linux',
      title: 'Linux Fundamentals',
      icon: Terminal,
      color: 'from-green-500 to-emerald-600',
      lessons: 5,
      description: 'تعلم أساسيات Linux والأوامر الضرورية'
    },
    {
      id: 'owasp',
      title: 'OWASP Top 10',
      icon: Shield,
      color: 'from-red-500 to-rose-600',
      lessons: 10,
      description: 'أخطر الثغرات الأمنية في تطبيقات الويب'
    }
  ];

  const owaspLessons = [
    {
      id: 'info-disclosure',
      title: 'Information Disclosure',
      subtitle: 'ثغرات البيانات المسربة',
      icon: FileText,
      status: 'active'
    },
    {
      id: 'broken-access',
      title: 'Broken Access Control',
      subtitle: 'ثغرات التحكم بالصلاحيات',
      icon: Lock,
      status: 'active'
    },
    { id: 'broken-auth', title: 'Broken Authentication', icon: Key, status: 'soon' },
    { id: 'injection', title: 'Injection', icon: Code, status: 'soon' },
    { id: 'xss', title: 'Cross-Site Scripting', icon: AlertTriangle, status: 'soon' }
  ];

  const HomePage = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
          <Shield className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          HU Cybersecurity Bootcamp
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          رحلتك التفاعلية لاحتراف الأمن السيبراني من الصفر
        </p>
        <div className="flex gap-4 justify-center items-center text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            {completedLessons.length} دروس مكتملة
          </span>
          <span className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-gray-400" />
            {15 - completedLessons.length} متبقية
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map(course => {
          const Icon = course.icon;
          const progress = (completedLessons.filter(l => l.startsWith(course.id)).length / course.lessons) * 100;
          
          return (
            <div 
              key={course.id}
              onClick={() => setCurrentPage(course.id)}
              className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${course.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{course.lessons} دروس</span>
                    <span>{Math.round(progress)}% مكتمل</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${course.color} transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">ابدأ رحلتك الآن</h3>
        <p className="text-indigo-100 mb-6">
          تعلم الأمن السيبراني بطريقة عملية وتفاعلية مع أمثلة حقيقية ومختبرات عملية
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <Terminal className="w-6 h-6 mb-2" />
            <div className="font-semibold">تعلم عملي</div>
            <div className="text-indigo-200">تطبيق مباشر على أمثلة حقيقية</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <Code className="w-6 h-6 mb-2" />
            <div className="font-semibold">محتوى تفاعلي</div>
            <div className="text-indigo-200">أدوات وتمارين في الموقع</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <CheckCircle className="w-6 h-6 mb-2" />
            <div className="font-semibold">تتبع التقدم</div>
            <div className="text-indigo-200">راقب إنجازاتك خطوة بخطوة</div>
          </div>
        </div>
      </div>
    </div>
  );

  const LinuxPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setCurrentPage('home')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Linux Fundamentals</h2>
          <p className="text-gray-600">أساسيات نظام لينكس - قريباً</p>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-yellow-600" />
          <div>
            <h3 className="font-bold text-yellow-800">المحتوى قيد التطوير</h3>
            <p className="text-yellow-700">هذا القسم سيتم إضافته قريباً مع محتوى تفاعلي كامل</p>
          </div>
        </div>
      </div>
    </div>
  );

  const OwaspPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setCurrentPage('home')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">OWASP Top 10</h2>
          <p className="text-gray-600">أخطر الثغرات الأمنية في تطبيقات الويب</p>
        </div>
      </div>

      <div className="grid gap-4">
        {owaspLessons.map((lesson, index) => {
          const Icon = lesson.icon;
          const isCompleted = completedLessons.includes(lesson.id);
          const isActive = lesson.status === 'active';
          
          return (
            <div 
              key={lesson.id}
              onClick={() => isActive && setCurrentPage(lesson.id)}
              className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all ${
                isActive 
                  ? 'border-red-200 hover:border-red-400 cursor-pointer hover:shadow-lg' 
                  : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gray-300'
                }`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className={`p-3 rounded-lg ${isActive ? 'bg-red-100' : 'bg-gray-100'}`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-red-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{lesson.title}</h3>
                  {lesson.subtitle && <p className="text-gray-600 text-sm">{lesson.subtitle}</p>}
                </div>
                <div className="flex items-center gap-3">
                  {isActive ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      متاح الآن
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      قريباً
                    </span>
                  )}
                  {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
                  {isActive && <ChevronRight className="w-6 h-6 text-gray-400" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const InfoDisclosurePage = () => {
    const [robotsInput, setRobotsInput] = useState('');
    const [scanResults, setScanResults] = useState([]);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setCurrentPage('owasp')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">Information Disclosure</h2>
            <p className="text-gray-600">ثغرات البيانات المسربة</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">ما هي ثغرات Information Disclosure</h3>
          <p className="text-red-100">عندما يكشف الموقع معلومات حساسة بدون قصد للمستخدمين</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">فحص ملف robots.txt</h3>
          <input 
            type="text"
            placeholder="example.com"
            value={robotsInput}
            onChange={(e) => setRobotsInput(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-3"
          />
          <button 
            onClick={() => setScanResults(['تم العثور على /admin/', 'تم العثور على /backup/'])}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold"
          >
            فحص
          </button>
          {scanResults.length > 0 && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              {scanResults.map((r, i) => <div key={i}>{r}</div>)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const BrokenAccessPage = () => {
    const [cookieValue, setCookieValue] = useState('user');

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setCurrentPage('owasp')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">Broken Access Control</h2>
            <p className="text-gray-600">ثغرات التحكم بالصلاحيات</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">ما هي ثغرات التحكم بالصلاحيات</h3>
          <p className="text-orange-100">عندما يتمكن المستخدمون من الوصول لموارد خارج صلاحياتهم</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">محاكي التلاعب بالكوكيز</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="text-sm text-gray-600 mb-2">Cookie الحالي</div>
            <div className="font-mono">role={cookieValue}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCookieValue('user')}
              className={`p-4 rounded-lg font-semibold ${
                cookieValue === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              User
            </button>
            <button
              onClick={() => setCookieValue('admin')}
              className={`p-4 rounded-lg font-semibold ${
                cookieValue === 'admin' ? 'bg-red-500 text-white' : 'bg-gray-200'
              }`}
            >
              Admin
            </button>
          </div>

          {cookieValue === 'admin' && (
            <div className="mt-4 bg-red-100 border-2 border-red-300 p-4 rounded-lg">
              <div className="font-bold text-red-800">تم الوصول للوحة التحكم</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'linux':
        return <LinuxPage />;
      case 'owasp':
        return <OwaspPage />;
      case 'info-disclosure':
        return <InfoDisclosurePage />;
      case 'broken-access':
        return <BrokenAccessPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                HU CyberSec Bootcamp
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('linux')}
                className="px-4 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100"
              >
                Linux
              </button>
              <button
                onClick={() => setCurrentPage('owasp')}
                className="px-4 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100"
              >
                OWASP Top 10
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>

      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">HU CyberSec Bootcamp 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default CyberSecurityBootcamp;