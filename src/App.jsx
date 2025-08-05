import { useState, useEffect } from 'react';
import { CIcon } from '@coreui/icons-react';
import { cilList, cilShieldAlt } from '@coreui/icons';


function App() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // For Navbar background
      setIsScrolled(window.scrollY > 50);

      // For Active Section Highlight
      const sectionIds = [
        'home',
        'about',
        'projects',
        'skills',
        'contact',
      ];
      
      let currentSection = '';

      // We iterate from the bottom-most section to the top
      for (const id of [...sectionIds].reverse()) {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          // An offset of 150px makes the switch happen a bit earlier
          if (window.scrollY >= sectionTop - 400) {
            currentSection = id;
            break; // Found the current section, no need to check further
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs only once on mount
	const skills = {
		Languages: [
			'Python',
			'JavaScript',
			'C',
			'C++',
			'Java',
			'Dart',
			'HTML',
			'CSS',
			'SQL',
			'NoSQL',
			'Bash',
		],
		Frameworks: [
			'React',
			'Flutter',
			'FastAPI',
			'Flask',
			'NextJS',
			'Vite',
			'PySide6',
		],
		'Tools & Databases': [
			'Git',
			'MongoDB',
			'MySQL',
			'SQLite',
			'Qt-Designer',
		],
		Platforms: ['Linux', 'Web', 'Windows', 'Arduino', 'Raspberry Pi'],
	};

	const projects = [
		{
			name: 'Athena',
			description:
				'AI-powered booking assistant for cabs, hotels, movies, and restaurants with Flutter frontend',
			tech: 'Flutter',
			date: 'February 2025',
			icon: 'fas fa-robot',
		},
		{
			name: 'ShogunScripts',
			description:
				'GUI desktop app for script automation and PDF report generation',
			tech: 'Python, PySide6',
			date: 'April 2025',
			icon: 'fas fa-terminal',
		},
		{
			name: 'KnowMyCollege',
			description:
				'Interactive college comparison platform with LLM-powered recommendations',
			tech: 'Flask, LangChain, HTML, CSS',
			date: 'February 2024',
			icon: 'fas fa-graduation-cap',
		},
		{
			name: 'Spotpie',
			description:
				'Developer library converting natural language to Spotify API commands',
			tech: 'Python, Spotify Web API',
			date: 'January 2025',
			icon: 'fas fa-music',
		},
		{
			name: 'Okaisa',
			description:
				'Command-line personal finance and money management application',
			tech: 'Java',
			date: 'March 2025',
			icon: 'fas fa-wallet',
		},
	];

	const achievements = [
		{
			title: 'Smart India Hackathon Winner',
			location: 'IIT Kharagpur',
			date: 'December 2024',
		},
		{
			title: 'TechXcelerate Winner',
			location: 'BITS Goa Campus',
			date: 'February 2025',
		},
		{ title: 'HackIN Winner', location: 'IIIT Pune', date: 'March 2024' },
	];

	const scrollToSection = (sectionId) => {
		document
			.getElementById(sectionId)
			.scrollIntoView({ behavior: 'smooth' });
		setActiveSection(sectionId);
	};

	return (
		<div className="min-h-screen">
			{/* Development Notice */}
			<div className="fixed top-4 right-4 z-50 floating-notice">
				<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-lg shadow-lg max-w-sm">
					<div className="flex items-center">
						<i className="fas fa-construction text-yellow-500 mr-2"></i>
						<div>
							<p className="font-semibold text-sm">
								Site Under Development
							</p>
							<p className="text-xs">
								Currently showing basic information
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav
				className={`fixed top-0 w-full z-40 transition-all duration-300 ${
					isScrolled
						? 'bg-white/50 backdrop-blur-md shadow-lg'
						: 'bg-transparent text-white'
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-center items-center py-4">
						{/* <div className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
              Deepanshu
            </div> */}
						<div className="hidden md:flex space-x-8">
							{[
								'Home',
								'About',
								'Projects',
								'Skills',
								'Contact',
							].map((item) => (
								<button
									key={item}
									onClick={() =>
										scrollToSection(item.toLowerCase())
									}
									className={`font-medium transition-colors ${
										activeSection === item.toLowerCase()
											? 'text-purple-400'
											: 'text-gray-700 hover:text-purple-600'
									} 
                  ${ isScrolled 
                    ? ''
                    : 'text-white hover:text-purple-200'
                  }`}
								>
									{item}
								</button>
							))}
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section
				id="home"
				className="min-h-screen gradient-bg flex items-center justify-center text-white"
			>
				<div className="text-center max-w-4xl mx-auto px-4">
					<div className="mb-8">
						<h1 className="text-5xl md:text-7xl font-bold mb-4">
							Deepanshu Choudhary
						</h1>
						<div className="text-xl md:text-2xl mb-6">
							Full Stack Developer
						</div>
						<p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
							Computer Science Engineering student at IIIT Pune,
							building innovative solutions with modern
							technologies
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
						<a
							href="mailto:h4636oh@tuta.io"
							className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
						>
							Get In Touch
						</a>
						<a
							href="https://github.com/h4636oh"
							target="_blank"
							rel="noopener noreferrer"
							className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
						>
							View GitHub
						</a>
					</div>

					<div className="flex justify-center space-x-6">
						<a
							href="https://h4636oh.me"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-200 transition-colors"
						>
							<i className="fas fa-globe text-2xl"></i>
						</a>
						<a
							href="https://github.com/h4636oh"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-200 transition-colors"
						>
							<i className="fab fa-github text-2xl"></i>
						</a>
						<a
							href="https://leetcode.com/u/h4636oh"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-200 transition-colors"
						>
							<i className="fa-solid fa-code text-2xl"></i>
						</a>

						<a
							href="mailto:h4636oh@tuta.io"
							className="text-white hover:text-gray-200 transition-colors"
						>
							<i className="fas fa-envelope text-2xl"></i>
						</a>
						<a
							href="tel:+917023334859"
							className="text-white hover:text-gray-200 transition-colors"
						>
							<i className="fas fa-phone text-2xl"></i>
						</a>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
						About Me
					</h2>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-2xl font-bold mb-4 text-gray-800">
								Education & Background
							</h3>
							<div className="mb-6">
								<h4 className="font-semibold text-lg text-purple-600 mb-2">
									Indian Institute of Information Technology
									Pune
								</h4>
								<p className="text-gray-600 mb-2">
									Bachelor of Technology - Computer Science &
									Engineering
								</p>
								<p className="text-gray-600 mb-2">
									CGPA: 7.91 | SGPA: 8.64
								</p>
								<p className="text-gray-500">
									July 2023 - May 2027
								</p>
							</div>

							<h4 className="font-semibold text-lg mb-3 text-gray-700">
								Key Coursework
							</h4>
							<div className="flex flex-wrap gap-2">
								{[
									'Operating Systems',
									'Data Structures',
									'Analysis Of Algorithms',
									'Artificial Intelligence',
									'Networking',
									'Databases',
									'Compiler Design',
								].map((course) => (
									<span
										key={course}
										className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
									>
										{course}
									</span>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-2xl font-bold mb-4 text-gray-800">
								Experience
							</h3>

							<div className="space-y-6">
								<div className="border-l-4 border-purple-500 pl-4">
									<h4 className="font-semibold text-lg text-purple-600">
										Arealis.io
									</h4>
									<p className="text-gray-600 font-medium">
										Fullstack Developer (Hybrid)
									</p>
									<p className="text-gray-500 text-sm mb-2">
										June 2025 - August 2025
									</p>
									<ul className="text-gray-600 text-sm space-y-1">
										<li>
											• Developed responsive website using
											Next.JS, TypeScript and Tailwind
										</li>
										<li>
											• Implemented authentication with
											email, Google, Facebook login
										</li>
									</ul>
								</div>

								<div className="border-l-4 border-blue-500 pl-4">
									<h4 className="font-semibold text-lg text-blue-600">
										Millionaire Elite Event
									</h4>
									<p className="text-gray-600 font-medium">
										Developer (Freelance, Remote)
									</p>
									<p className="text-gray-500 text-sm mb-2">
										February 2025 - April 2025
									</p>
									<ul className="text-gray-600 text-sm space-y-1">
										<li>
											• Complete website design using
											React and CSS
										</li>
										<li>
											• Integrated backend and frontend
											with dynamic data handling
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section id="projects" className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
						Featured Projects
					</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project, index) => (
							<div
								key={index}
								className="project-card rounded-xl p-6 card-hover"
							>
								<div className="flex items-center mb-4">
									<div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mr-4">
										<i
											className={`${project.icon} text-white text-xl`}
										></i>
									</div>
									<div>
										<h3 className="font-bold text-lg text-gray-800">
											{project.name}
										</h3>
										<p className="text-gray-500 text-sm">
											{project.date}
										</p>
									</div>
								</div>

								<p className="text-gray-600 mb-4 text-sm leading-relaxed">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2">
									{project.tech.split(', ').map((tech) => (
										<span
											key={tech}
											className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section id="skills" className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
						Skills & Technologies
					</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{Object.entries(skills).map(([category, skillList]) => (
							<div
								key={category}
								className="bg-gray-50 rounded-xl p-6"
							>
								<h3 className="font-bold text-lg mb-4 text-gray-800">
									{category}
								</h3>
								<div className="flex flex-wrap gap-2">
									{skillList.map((skill) => (
										<span
											key={skill}
											className="skill-badge bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						))}
					</div>

					{/* Achievements */}
					<div className="mt-16">
						<h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
							Achievements
						</h3>
						<div className="grid md:grid-cols-3 gap-6">
							{achievements.map((achievement, index) => (
								<div
									key={index}
									className="bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-xl p-6 text-center card-hover"
								>
									<i className="fas fa-trophy text-3xl mb-4"></i>
									<h4 className="font-bold text-lg mb-2">
										{achievement.title}
									</h4>
									<p className="text-purple-100 mb-1">
										{achievement.location}
									</p>
									<p className="text-purple-200 text-sm">
										{achievement.date}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-20 gradient-bg text-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
					<p className="text-xl mb-12 opacity-90">
						I'm always interested in new opportunities and exciting
						projects. Let's discuss how we can work together!
					</p>

					<div className="grid md:grid-cols-2 gap-8 mb-12">
						<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
							<i className="fas fa-envelope text-3xl mb-4"></i>
							<h3 className="font-semibold text-lg mb-2">
								Email
							</h3>
							<a
								href="mailto:h4636oh@tuta.io"
								className="text-white/80 hover:text-white transition-colors"
							>
								h4636oh@tuta.io
							</a>
						</div>

						<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
							<i className="fas fa-phone text-3xl mb-4"></i>
							<h3 className="font-semibold text-lg mb-2">
								Phone
							</h3>
							<a
								href="tel:+917023334859"
								className="text-white/80 hover:text-white transition-colors"
							>
								+91 7023334859
							</a>
						</div>
					</div>

					<div className="flex justify-center space-x-6">
						<a
							href="https://h4636oh.me"
							target="_blank"
							rel="noopener noreferrer"
							className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
						>
							<i className="fas fa-globe"></i>
						</a>
						<a
							href="https://github.com/h4636oh"
							target="_blank"
							rel="noopener noreferrer"
							className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
						>
							<i className="fab fa-github"></i>
						</a>
						<a
							href="mailto:h4636oh@tuta.io"
							className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
						>
							<i className="fas fa-envelope"></i>
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p className="text-gray-400">
						© 2025 Deepanshu Choudhary. Built with React, Vite &
						Tailwind CSS.
					</p>
					<p className="text-gray-500 text-sm mt-2">
						Showcasing skills in modern web development
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
