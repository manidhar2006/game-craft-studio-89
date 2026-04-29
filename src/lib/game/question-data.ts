import type { BankQuestion } from "./question-bank";

export const QUESTION_DATA = [
  {
    "principleNo": 1,
    "id": "core-p1-2",
    "source": "core",
    "text": "Under Section 4 of DPDPA 2023, a person may process personal data of a Data Principal only if:",
    "options": [
      {
        "key": "A",
        "text": "The data is publicly available"
      },
      {
        "key": "B",
        "text": "The processing is for commercial purposes"
      },
      {
        "key": "C",
        "text": "The Data Principal has given consent or the processing is for certain legitimate uses"
      },
      {
        "key": "D",
        "text": "The Data Fiduciary has a privacy policy in place"
      }
    ],
    "correct": "C",
    "explanation": "Section 4 clearly states that personal data may be processed only (a) with the consent of the Data Principal, or (b) for certain legitimate uses as referred to in Section 7. Having a privacy policy or commercial purpose alone does not make processing lawful.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-3",
    "source": "core",
    "text": "The term \"lawful purpose\" under Section 4 of DPDPA is defined as:",
    "options": [
      {
        "key": "A",
        "text": "A purpose approved by the Data Protection Board"
      },
      {
        "key": "B",
        "text": "Any purpose which is not expressly forbidden by law"
      },
      {
        "key": "C",
        "text": "A purpose for which the government has given permission"
      },
      {
        "key": "D",
        "text": "Any purpose related to national security"
      }
    ],
    "correct": "B",
    "explanation": "The Act explicitly defines \"lawful purpose\" as any purpose which is not expressly forbidden by law. This is a broad definition and does not require prior government approval or Board sanction.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-4",
    "source": "core",
    "text": "Which of the following is NOT a ground for \"certain legitimate uses\" under Section 7 of DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Medical emergency involving threat to life"
      },
      {
        "key": "B",
        "text": "Processing for a Data Fiduciary's marketing campaign"
      },
      {
        "key": "C",
        "text": "Compliance with a court order"
      },
      {
        "key": "D",
        "text": "Disaster management purposes"
      }
    ],
    "correct": "B",
    "explanation": "Section 7 lists specific legitimate uses such as medical emergencies, court orders, and disaster management. Marketing campaigns are NOT listed as a legitimate use and would require explicit consent of the Data Principal to be lawful.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-5",
    "source": "core",
    "text": "X, a company, processes personal data of its users without their consent, claiming it is for \"business improvement.\" Under DPDPA, this processing is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful because it is for business improvement"
      },
      {
        "key": "B",
        "text": "Lawful if a privacy policy mentions it"
      },
      {
        "key": "C",
        "text": "Unlawful because business improvement is not a legitimate use under Section 7"
      },
      {
        "key": "D",
        "text": "Lawful if done anonymously"
      }
    ],
    "correct": "C",
    "explanation": "\"Business improvement\" is not listed as a legitimate use under Section 7. Without consent or a recognized legitimate use, processing personal data is unlawful under Section 4 of DPDPA.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-6",
    "source": "core",
    "text": "A pregnant woman enrolls on a government app to avail maternity benefits and consents to provide her personal data. The government then uses this data to determine her eligibility for another prescribed benefit. This is:",
    "options": [
      {
        "key": "A",
        "text": "Unlawful as fresh consent is needed for each benefit"
      },
      {
        "key": "B",
        "text": "Lawful under Section 7(b) as a legitimate use by the State"
      },
      {
        "key": "C",
        "text": "Unlawful as it violates purpose limitation"
      },
      {
        "key": "D",
        "text": "Lawful only if she is informed in advance"
      }
    ],
    "correct": "B",
    "explanation": "This is the exact illustration provided in Section 7(b) of the Act. The State may process personal data for providing prescribed subsidies, benefits, and services, and where she has previously consented for any benefit, the State may use that data for determining eligibility for other prescribed benefits.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-7",
    "source": "core",
    "text": "Under which section of DPDPA are the \"certain legitimate uses\" for processing personal data without consent listed?",
    "options": [
      {
        "key": "A",
        "text": "Section 5"
      },
      {
        "key": "B",
        "text": "Section 6"
      },
      {
        "key": "C",
        "text": "Section 7"
      },
      {
        "key": "D",
        "text": "Section 8"
      }
    ],
    "correct": "C",
    "explanation": "Section 7 of the DPDPA specifically lists all \"certain legitimate uses\" for which personal data can be processed without requiring explicit consent from the Data Principal. Section 5 deals with notice, Section 6 with consent, and Section 8 with general obligations.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-8",
    "source": "core",
    "text": "Which of the following scenarios represents LAWFUL processing under DPDPA without explicit consent?",
    "options": [
      {
        "key": "A",
        "text": "An e-commerce company selling user data to advertisers"
      },
      {
        "key": "B",
        "text": "A hospital processing patient data during a declared epidemic"
      },
      {
        "key": "C",
        "text": "A social media platform using data for targeted advertising"
      },
      {
        "key": "D",
        "text": "A company sharing employee data with a competitor"
      }
    ],
    "correct": "B",
    "explanation": "Section 7(g) specifically allows processing personal data for medical treatment or health services during an epidemic or outbreak of disease. This is a recognized legitimate use that does not require explicit consent.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-9",
    "source": "core",
    "text": "A Data Fiduciary processes personal data for compliance with a judgment of a civil court in India. This processing is:",
    "options": [
      {
        "key": "A",
        "text": "Unlawful as courts cannot authorize data processing"
      },
      {
        "key": "B",
        "text": "Lawful under Section 7(e) as compliance with court orders is a legitimate use"
      },
      {
        "key": "C",
        "text": "Lawful only if the Data Principal consents"
      },
      {
        "key": "D",
        "text": "Unlawful unless approved by the Data Protection Board"
      }
    ],
    "correct": "B",
    "explanation": "Section 7(e) specifically recognizes compliance with any judgment, decree or order issued under any law in force in India as a legitimate use for processing personal data, making such processing lawful even without the Data Principal's explicit consent.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-10",
    "source": "core",
    "text": "Processing of personal data for prevention of corporate espionage by an employer falls under which category of DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Unlawful processing as it violates employee privacy"
      },
      {
        "key": "B",
        "text": "Lawful processing under Section 7(i) — employment-related purposes"
      },
      {
        "key": "C",
        "text": "Lawful only with written consent of the employee"
      },
      {
        "key": "D",
        "text": "Unlawful unless directed by the Central Government"
      }
    ],
    "correct": "B",
    "explanation": "Section 7(i) specifically allows processing for employment purposes, including safeguarding the employer from loss or liability such as prevention of corporate espionage, maintenance of confidentiality of trade secrets and intellectual property.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "core-p1-11",
    "source": "core",
    "text": "Which of the following statements about lawful processing under DPDPA is INCORRECT?",
    "options": [
      {
        "key": "A",
        "text": "Processing must be either consented to or fall under legitimate uses"
      },
      {
        "key": "B",
        "text": "A lawful purpose means any purpose not expressly forbidden by law"
      },
      {
        "key": "C",
        "text": "Any processing done by a private company is automatically lawful"
      },
      {
        "key": "D",
        "text": "State instrumentalities can process data for national security purposes"
      }
    ],
    "correct": "C",
    "explanation": "Processing by a private company is NOT automatically lawful. It must still be based on consent or fall under one of the legitimate uses listed in Section 7. The mere fact that the processor is a private entity does not grant automatic lawfulness to data processing activities.\n\n---\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-2",
    "source": "core",
    "text": "Under DPDPA 2023, a notice given to the Data Principal must be presented:",
    "options": [
      {
        "key": "A",
        "text": "Along with the terms and conditions document"
      },
      {
        "key": "B",
        "text": "Independently and understandably separate from any other information"
      },
      {
        "key": "C",
        "text": "Only after the data has been collected"
      },
      {
        "key": "D",
        "text": "Only in the English language"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3(a) specifically states that the notice must be presented and be understandable independently of any other information that has been, is, or may be made available by the Data Fiduciary. Embedding notice in terms and conditions would violate this requirement.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-3",
    "source": "core",
    "text": "Which of the following is NOT required to be included in a notice under Section 5 and Rule 3 of DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Description of personal data being collected"
      },
      {
        "key": "B",
        "text": "Purpose of processing"
      },
      {
        "key": "C",
        "text": "The financial details of the Data Fiduciary"
      },
      {
        "key": "D",
        "text": "How to withdraw consent"
      }
    ],
    "correct": "C",
    "explanation": "Section 5 and Rule 3 require the notice to include description of personal data, purpose of processing, rights of the Data Principal, and how to withdraw consent and complain. Financial details of the Data Fiduciary are not required to be disclosed in the notice.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-4",
    "source": "core",
    "text": "Under DPDPA, in what language must the notice and consent request be presented to the Data Principal?",
    "options": [
      {
        "key": "A",
        "text": "Only in English"
      },
      {
        "key": "B",
        "text": "Only in Hindi"
      },
      {
        "key": "C",
        "text": "In English or any language specified in the Eighth Schedule to the Constitution"
      },
      {
        "key": "D",
        "text": "In the official language of the state where the Data Fiduciary is registered"
      }
    ],
    "correct": "C",
    "explanation": "Section 5(3) and Section 6(3) both require that the Data Fiduciary must give the Data Principal the option to access the contents of the notice in English or any language specified in the Eighth Schedule to the Constitution of India.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-5",
    "source": "core",
    "text": "X, an individual, gave consent to an e-commerce company Y before the DPDPA came into force. After the Act's commencement, Y must:",
    "options": [
      {
        "key": "A",
        "text": "Immediately stop processing X's data and seek fresh consent"
      },
      {
        "key": "B",
        "text": "Give X a notice as soon as reasonably practicable describing the data and purpose"
      },
      {
        "key": "C",
        "text": "Delete all of X's data and start fresh"
      },
      {
        "key": "D",
        "text": "Do nothing as prior consent is permanently valid"
      }
    ],
    "correct": "B",
    "explanation": "Section 5(2) deals with pre-existing consents. The Data Fiduciary may continue processing but must, as soon as reasonably practicable, give the Data Principal a notice describing the personal data processed and the purpose. The Data Fiduciary may continue until the Data Principal withdraws consent.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-6",
    "source": "core",
    "text": "The ease of withdrawing consent under DPDPA must be:",
    "options": [
      {
        "key": "A",
        "text": "Subject to a 30-day notice period"
      },
      {
        "key": "B",
        "text": "Comparable to the ease with which consent was given"
      },
      {
        "key": "C",
        "text": "Possible only through written application"
      },
      {
        "key": "D",
        "text": "Available only after completing the service for which consent was given"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(4) and Rule 3(c)(i) both state that the ease of withdrawing consent shall be comparable to the ease with which such consent was given. If consent was given with a single click, withdrawal must also be available with a similarly simple process.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-7",
    "source": "core",
    "text": "Under Rule 3 of DPDP Rules 2025, a notice must include which of the following regarding the Data Fiduciary's platform?",
    "options": [
      {
        "key": "A",
        "text": "The Data Fiduciary's annual revenue"
      },
      {
        "key": "B",
        "text": "A specific communication link to access the website or app"
      },
      {
        "key": "C",
        "text": "The names of all Data Processors engaged by the Data Fiduciary"
      },
      {
        "key": "D",
        "text": "The penalty structure for data breaches"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3(c) requires that the notice must give the particular communication link for accessing the website or app, or both, of the Data Fiduciary, through which the Data Principal can withdraw consent, exercise rights, and make complaints to the Board.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-8",
    "source": "core",
    "text": "Y, a bank, asks X to open an account via video-based KYC. According to the illustration in Section 5(1), Y must:",
    "options": [
      {
        "key": "A",
        "text": "Collect data first, then provide notice"
      },
      {
        "key": "B",
        "text": "Accompany or precede the data request with a notice describing the data and purpose"
      },
      {
        "key": "C",
        "text": "Provide notice only after the KYC is complete"
      },
      {
        "key": "D",
        "text": "Provide notice only if X requests it"
      }
    ],
    "correct": "B",
    "explanation": "The illustration under Section 5(1) specifically addresses this scenario. Y (the bank) shall accompany or precede the request for personal data with a notice to X, describing the personal data and the purpose of its processing. Notice must come before or with the request, not after.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-9",
    "source": "core",
    "text": "Which Rule of DPDP Rules 2025 governs the notice to be given by a Data Fiduciary to a Data Principal?",
    "options": [
      {
        "key": "A",
        "text": "Rule 2"
      },
      {
        "key": "B",
        "text": "Rule 3"
      },
      {
        "key": "C",
        "text": "Rule 5"
      },
      {
        "key": "D",
        "text": "Rule 7"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3 of the Digital Personal Data Protection Rules 2025 specifically governs the \"Notice given by Data Fiduciary to Data Principal\" and sets out all the requirements for what a valid notice must contain and how it must be presented.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-10",
    "source": "core",
    "text": "According to Rule 3, the description of personal data in the notice must be:",
    "options": [
      {
        "key": "A",
        "text": "A general overview of data categories"
      },
      {
        "key": "B",
        "text": "An itemised description of such personal data"
      },
      {
        "key": "C",
        "text": "A summary not exceeding 500 words"
      },
      {
        "key": "D",
        "text": "A reference to the privacy policy document"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3(b)(i) specifically requires an \"itemised description\" of the personal data being collected. This means each type of data must be listed individually, not described in general or vague terms, and definitely not merely referenced through a privacy policy.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "core-p2-11",
    "source": "core",
    "text": "A Data Fiduciary places its data collection notice inside a 50-page terms and conditions document with no separate link or emphasis. Under DPDPA, this notice is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as the information is technically available to the user"
      },
      {
        "key": "B",
        "text": "Invalid as it violates the requirement of being independently understandable"
      },
      {
        "key": "C",
        "text": "Valid if the user signs the document"
      },
      {
        "key": "D",
        "text": "Valid only if the Data Fiduciary proves the user read the terms"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3(a) requires that the notice must be \"presented and be understandable independently of any other information.\" Burying the notice in a lengthy terms and conditions document directly violates this requirement, making such a notice invalid under DPDPA.\n\n---\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-2",
    "source": "core",
    "text": "Which of the following is NOT one of the required attributes of valid consent under Section 6(1) of DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Free"
      },
      {
        "key": "B",
        "text": "Informed"
      },
      {
        "key": "C",
        "text": "Reversible"
      },
      {
        "key": "D",
        "text": "Unambiguous"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(1) lists five attributes of valid consent: free, specific, informed, unconditional, and unambiguous. \"Reversible\" is not one of them. While consent can be withdrawn, the attribute itself is not called \"reversible\" in the Act.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-3",
    "source": "core",
    "text": "X downloads a telemedicine app and gives consent for telemedicine services AND access to her phone contacts. Under DPDPA, the consent for phone contacts is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as X freely gave consent"
      },
      {
        "key": "B",
        "text": "Invalid as phone contacts are not necessary for telemedicine services"
      },
      {
        "key": "C",
        "text": "Valid if the app has a privacy policy explaining the use of contacts"
      },
      {
        "key": "D",
        "text": "Valid as long as it is mentioned in the terms of service"
      }
    ],
    "correct": "B",
    "explanation": "This is the direct illustration from Section 6(1) of the Act. Consent must be limited to personal data necessary for the specified purpose. Since phone contacts are not necessary for telemedicine services, consent for accessing contacts is invalid as it violates the data minimization aspect of consent.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-4",
    "source": "core",
    "text": "X buys an insurance policy and gives consent for: (i) processing her data for issuing the policy, and (ii) waiving her right to file a complaint with the Board. What is the status of consent (ii)?",
    "options": [
      {
        "key": "A",
        "text": "Valid as X freely agreed to waive the right"
      },
      {
        "key": "B",
        "text": "Valid if the insurer mentions it clearly in the policy document"
      },
      {
        "key": "C",
        "text": "Invalid as it constitutes an infringement of the Act"
      },
      {
        "key": "D",
        "text": "Valid only if approved by the Data Protection Board"
      }
    ],
    "correct": "C",
    "explanation": "This is the exact illustration given in Section 6(2). Any part of consent that constitutes an infringement of the provisions of the Act is invalid to the extent of such infringement. Waiving the right to file a complaint with the Board is a right granted by the Act and cannot be waived through consent.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-5",
    "source": "core",
    "text": "When a Data Principal withdraws consent, the legal consequences are:",
    "options": [
      {
        "key": "A",
        "text": "All previous processing becomes unlawful"
      },
      {
        "key": "B",
        "text": "The Data Fiduciary can continue processing for 6 months"
      },
      {
        "key": "C",
        "text": "The consequences are borne by the Data Principal and withdrawal does not affect legality of prior processing"
      },
      {
        "key": "D",
        "text": "The Data Fiduciary can seek compensation from the Data Principal"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(5) clearly states that the consequences of withdrawal shall be borne by the Data Principal and such withdrawal shall not affect the legality of processing based on consent before its withdrawal. This means past processing remains lawful even after withdrawal.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-6",
    "source": "core",
    "text": "After X withdraws consent from a telecom provider Y, Y must:",
    "options": [
      {
        "key": "A",
        "text": "Continue processing until the billing cycle ends"
      },
      {
        "key": "B",
        "text": "Within a reasonable time, cease and cause its Data Processors to cease processing"
      },
      {
        "key": "C",
        "text": "Immediately delete all data including backups"
      },
      {
        "key": "D",
        "text": "Seek fresh consent before ceasing processing"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(6) requires that after withdrawal of consent, the Data Fiduciary shall within a reasonable time cease and cause its Data Processors to cease processing the personal data, unless such processing is required or authorized under any other provision of the Act or any other law.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-7",
    "source": "core",
    "text": "A Consent Manager under DPDPA acts as:",
    "options": [
      {
        "key": "A",
        "text": "A regulator appointed by the Central Government"
      },
      {
        "key": "B",
        "text": "A single point of contact enabling Data Principals to give, manage, review and withdraw consent"
      },
      {
        "key": "C",
        "text": "A lawyer representing the Data Principal in Board proceedings"
      },
      {
        "key": "D",
        "text": "An auditor verifying Data Fiduciary compliance"
      }
    ],
    "correct": "B",
    "explanation": "Section 2(g) defines a Consent Manager as a person registered with the Board who acts as a single point of contact to enable a Data Principal to give, manage, review and withdraw her consent through an accessible, transparent and interoperable platform.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-8",
    "source": "core",
    "text": "In a proceeding before the Data Protection Board, who bears the burden of proving that valid consent was obtained?",
    "options": [
      {
        "key": "A",
        "text": "The Data Principal"
      },
      {
        "key": "B",
        "text": "The Data Protection Board"
      },
      {
        "key": "C",
        "text": "The Data Fiduciary"
      },
      {
        "key": "D",
        "text": "The Consent Manager"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(10) explicitly states that where consent is the basis of processing and a question arises in a proceeding, the Data Fiduciary shall be obliged to prove that notice was given and consent was given by the Data Principal in accordance with the provisions of the Act.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-9",
    "source": "core",
    "text": "A website uses pre-ticked checkboxes for consent to data processing. Under DPDPA, this consent is:",
    "options": [
      {
        "key": "A",
        "text": "Valid if the checkbox is clearly visible"
      },
      {
        "key": "B",
        "text": "Valid if the user does not untick the box"
      },
      {
        "key": "C",
        "text": "Invalid as it is not a clear affirmative action"
      },
      {
        "key": "D",
        "text": "Valid if mentioned in the terms and conditions"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(1) requires consent to be \"unambiguous with a clear affirmative action.\" A pre-ticked checkbox is not a clear affirmative action — the user has not actively chosen to consent. This form of consent does not meet the DPDPA standard.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-10",
    "source": "core",
    "text": "X places an order on an e-commerce platform Y and then withdraws consent. Y must stop processing for future orders. However, regarding the already ordered and paid-for goods, Y:",
    "options": [
      {
        "key": "A",
        "text": "Must immediately cancel the order"
      },
      {
        "key": "B",
        "text": "May continue processing to fulfill the already placed order"
      },
      {
        "key": "C",
        "text": "Must refund X and cancel the order"
      },
      {
        "key": "D",
        "text": "Must seek fresh consent to deliver the goods"
      }
    ],
    "correct": "B",
    "explanation": "The illustration under Section 6(5) specifically addresses this. If X withdraws consent, Y may stop enabling X to use the app for placing orders but may NOT stop processing for the supply of goods already ordered and paid for by X, as this would affect the legal transaction already completed.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "core-p3-11",
    "source": "core",
    "text": "Under Section 6(9), for a Consent Manager to operate, it must be:",
    "options": [
      {
        "key": "A",
        "text": "Approved by the Ministry of Electronics and IT"
      },
      {
        "key": "B",
        "text": "Registered with the Data Protection Board"
      },
      {
        "key": "C",
        "text": "Certified by an independent auditor"
      },
      {
        "key": "D",
        "text": "Approved by the Central Government's Cabinet Committee"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(9) states that every Consent Manager shall be registered with the Board in such manner and subject to such technical, operational, financial and other conditions as may be prescribed. Rule 4 and First Schedule of DPDP Rules 2025 further detail the registration conditions.\n\n---\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-2",
    "source": "core",
    "text": "The \"specified purpose\" under DPDPA means:",
    "options": [
      {
        "key": "A",
        "text": "Any purpose approved by the Data Protection Board"
      },
      {
        "key": "B",
        "text": "The purpose mentioned in the notice given by the Data Fiduciary to the Data Principal"
      },
      {
        "key": "C",
        "text": "Any purpose described in the Data Fiduciary's privacy policy"
      },
      {
        "key": "D",
        "text": "The purpose approved by the Central Government"
      }
    ],
    "correct": "B",
    "explanation": "Section 2(za) defines \"specified purpose\" as the purpose mentioned in the notice given by the Data Fiduciary to the Data Principal in accordance with the provisions of the Act and the rules made thereunder. This ties purpose limitation directly to the notice requirement.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-3",
    "source": "core",
    "text": "X registers on an online marketplace to sell her used car. After the sale is concluded, the marketplace Y:",
    "options": [
      {
        "key": "A",
        "text": "May retain X's data for future marketing"
      },
      {
        "key": "B",
        "text": "May retain data for 3 years as per standard practice"
      },
      {
        "key": "C",
        "text": "Shall no longer retain her personal data as the purpose is served"
      },
      {
        "key": "D",
        "text": "May retain data until X explicitly requests deletion"
      }
    ],
    "correct": "C",
    "explanation": "This is the direct illustration from Section 8(7). Once the specified purpose (selling the car) is served, the Data Fiduciary must erase the personal data. The purpose is no longer being served, triggering the erasure obligation under Section 8(7)(a).\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-4",
    "source": "core",
    "text": "A bank Y is required by banking law to maintain client identity records for 10 years after account closure. X closes her account. Y must:",
    "options": [
      {
        "key": "A",
        "text": "Erase X's data immediately as per DPDPA"
      },
      {
        "key": "B",
        "text": "Retain X's data for 10 years as required by law"
      },
      {
        "key": "C",
        "text": "Seek fresh consent to retain the data"
      },
      {
        "key": "D",
        "text": "Transfer the data to the Data Protection Board"
      }
    ],
    "correct": "B",
    "explanation": "This is the illustration from Section 8(7). Section 8(7) provides an exception — unless retention is necessary for compliance with any law for the time being in force. Since banking law requires 10-year retention, Y must retain X's data for that period despite account closure.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-5",
    "source": "core",
    "text": "Under Section 8(8), the specified purpose is deemed to no longer be served when the Data Principal:",
    "options": [
      {
        "key": "A",
        "text": "Sends a written request to erase data"
      },
      {
        "key": "B",
        "text": "Does not approach the Data Fiduciary for the specified purpose AND does not exercise her rights for the prescribed time period"
      },
      {
        "key": "C",
        "text": "Stops using the Data Fiduciary's services for 30 days"
      },
      {
        "key": "D",
        "text": "Submits a complaint to the Data Protection Board"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(8) states that the purpose is deemed no longer served when the Data Principal does not (a) approach the Data Fiduciary for performance of the specified purpose, AND (b) exercise any rights in relation to such processing, for such prescribed time period. Both conditions must be absent.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-6",
    "source": "core",
    "text": "An e-commerce company collected your data to process an order. After delivery, it uses your data to send promotional offers. Under DPDPA, this is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as it improves customer experience"
      },
      {
        "key": "B",
        "text": "Lawful if mentioned in the privacy policy"
      },
      {
        "key": "C",
        "text": "Unlawful as it exceeds the specified purpose of order processing"
      },
      {
        "key": "D",
        "text": "Lawful as long as the offers are relevant to your purchase"
      }
    ],
    "correct": "C",
    "explanation": "Purpose limitation requires that data collected for order processing can only be used for that purpose. Using the data for promotional marketing exceeds the specified purpose stated in the notice. Fresh consent would be required for marketing communications.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-7",
    "source": "core",
    "text": "Under Section 8(7)(b), when must a Data Fiduciary cause its Data Processors to erase personal data?",
    "options": [
      {
        "key": "A",
        "text": "When the Data Processor requests it"
      },
      {
        "key": "B",
        "text": "When the Data Protection Board orders it"
      },
      {
        "key": "C",
        "text": "When the Data Fiduciary erases the data — the Data Processor must also erase it"
      },
      {
        "key": "D",
        "text": "After 3 years from the date of processing"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(7)(b) specifically requires that the Data Fiduciary must cause its Data Processor to erase any personal data that was made available to it for processing. The erasure obligation flows from the Data Fiduciary down to all Data Processors engaged by it.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-8",
    "source": "core",
    "text": "An individual approached a Data Fiduciary for a specified purpose on 1st January. She neither contacted the Fiduciary again nor exercised any rights. What triggers data erasure under DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "The individual submitting a written erasure request"
      },
      {
        "key": "B",
        "text": "The expiry of the prescribed time period during which no contact or rights exercise occurred"
      },
      {
        "key": "C",
        "text": "The Data Fiduciary's annual review of inactive accounts"
      },
      {
        "key": "D",
        "text": "An order from the Data Protection Board"
      }
    ],
    "correct": "B",
    "explanation": "Under Section 8(8), the purpose is deemed no longer served when both conditions are absent for the prescribed time period — no approach for performance of purpose AND no exercise of rights. The Third Schedule of the Rules then specifies the exact time periods for different categories of Data Fiduciaries.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-9",
    "source": "core",
    "text": "Under Rule 8(2) of DPDP Rules 2025, before erasing personal data, the Data Fiduciary must inform the Data Principal how many hours in advance?",
    "options": [
      {
        "key": "A",
        "text": "24 hours"
      },
      {
        "key": "B",
        "text": "36 hours"
      },
      {
        "key": "C",
        "text": "48 hours"
      },
      {
        "key": "D",
        "text": "72 hours"
      }
    ],
    "correct": "C",
    "explanation": "Rule 8(2) states that at least forty-eight hours before completion of the time period for erasure, the Data Fiduciary shall inform the Data Principal that such personal data shall be erased upon completion of such period, unless she logs into her account or otherwise contacts the Fiduciary.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-10",
    "source": "core",
    "text": "An employer collects biometric data of employees for attendance tracking. After an employee resigns, the employer continues using that employee's biometric data to test a new attendance system. Under DPDPA, this is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as the employer owns the system"
      },
      {
        "key": "B",
        "text": "Unlawful as the specified purpose (attendance tracking) no longer exists for that employee"
      },
      {
        "key": "C",
        "text": "Lawful if the employee gave consent during employment"
      },
      {
        "key": "D",
        "text": "Lawful as long as the data is anonymized"
      }
    ],
    "correct": "B",
    "explanation": "Once the employee resigns, the specified purpose of attendance tracking is no longer served for that individual. Continuing to use their biometric data for testing a new system goes beyond the specified purpose and violates the purpose limitation principle under Section 6(1) and Section 8(7).\n\n---"
  },
  {
    "principleNo": 4,
    "id": "core-p4-11",
    "source": "core",
    "text": "Which section of DPDPA deals with the erasure obligation of a Data Fiduciary when the specified purpose is no longer served?",
    "options": [
      {
        "key": "A",
        "text": "Section 6(4)"
      },
      {
        "key": "B",
        "text": "Section 7(a)"
      },
      {
        "key": "C",
        "text": "Section 8(7)"
      },
      {
        "key": "D",
        "text": "Section 9(2)"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(7) specifically deals with the data erasure obligation. It states that unless retention is necessary for compliance with any law, the Data Fiduciary must erase personal data upon withdrawal of consent or as soon as it is reasonable to assume that the specified purpose is no longer being served.\n\n---\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-2",
    "source": "core",
    "text": "The data minimization principle under DPDPA requires that consent must be:",
    "options": [
      {
        "key": "A",
        "text": "Given separately for each type of data collected"
      },
      {
        "key": "B",
        "text": "Limited to personal data necessary for the specified purpose"
      },
      {
        "key": "C",
        "text": "Obtained in writing for sensitive personal data"
      },
      {
        "key": "D",
        "text": "Renewed every six months"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(1) explicitly states that consent must be \"limited to such personal data as is necessary for such specified purpose.\" This is the statutory expression of data minimization in the DPDPA — only data actually needed for the purpose may be collected.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-3",
    "source": "core",
    "text": "A food delivery app collects: (i) your delivery address, (ii) your payment details, and (iii) your complete social media profile. Under data minimization principle, which data collection is problematic?",
    "options": [
      {
        "key": "A",
        "text": "Only (i)"
      },
      {
        "key": "B",
        "text": "Only (iii)"
      },
      {
        "key": "C",
        "text": "(i) and (ii)"
      },
      {
        "key": "D",
        "text": "None — all data is necessary for delivery services"
      }
    ],
    "correct": "B",
    "explanation": "Delivery address and payment details are necessary for providing food delivery services. However, a complete social media profile has no relevance to food delivery. Collecting it violates the data minimization principle as it is not necessary for the specified purpose of food delivery.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-4",
    "source": "core",
    "text": "The data minimization principle is most directly linked to which other principle of DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Security & Integrity"
      },
      {
        "key": "B",
        "text": "Accountability"
      },
      {
        "key": "C",
        "text": "Purpose Limitation"
      },
      {
        "key": "D",
        "text": "Data Accuracy"
      }
    ],
    "correct": "C",
    "explanation": "Data minimization and purpose limitation are closely intertwined. Data minimization requires collecting only data necessary for the purpose, while purpose limitation requires using data only for the stated purpose. Together, they ensure data collection is both purposeful and proportionate.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-5",
    "source": "core",
    "text": "Under the Second Schedule of DPDP Rules 2025, for State processing, processing must be:",
    "options": [
      {
        "key": "A",
        "text": "Approved by the Data Protection Board"
      },
      {
        "key": "B",
        "text": "Limited to personal data necessary for the uses or purposes being achieved"
      },
      {
        "key": "C",
        "text": "Done only with explicit consent of the Data Principal"
      },
      {
        "key": "D",
        "text": "Restricted to data stored in Indian servers"
      }
    ],
    "correct": "B",
    "explanation": "The Second Schedule, which governs standards for processing by the State and its instrumentalities, specifically states that \"processing is limited to such personal data as is necessary for such uses or achieving such purposes.\" This applies the data minimization principle to government processing.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-6",
    "source": "core",
    "text": "X consents to a job portal collecting: (i) resume data, (ii) professional experience, and (iii) 10 years of personal location history. The consent for (iii) is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as X freely consented"
      },
      {
        "key": "B",
        "text": "Invalid as 10 years of location history is not necessary for job matching"
      },
      {
        "key": "C",
        "text": "Valid if the portal explains how location data improves job recommendations"
      },
      {
        "key": "D",
        "text": "Valid if mentioned in the terms of service"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(2) states that any part of consent that constitutes an infringement of the Act is invalid. Since 10 years of personal location history is not necessary for job portal services (specified purpose), collecting it violates data minimization under Section 6(1), making that part of the consent invalid.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-7",
    "source": "core",
    "text": "Which of the following best describes the relationship between data minimization and the validity of consent under DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Consent to excessive data collection is valid if the user is informed"
      },
      {
        "key": "B",
        "text": "Excessive data collection beyond what is necessary renders that part of consent invalid"
      },
      {
        "key": "C",
        "text": "Data minimization only applies to sensitive personal data"
      },
      {
        "key": "D",
        "text": "Data minimization is optional for Significant Data Fiduciaries"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(1) ties consent to data minimization — consent must be limited to necessary data. Section 6(2) then provides that any part of consent that violates the Act is invalid. Therefore, consent obtained for excessive, unnecessary data is invalid to that extent under DPDPA.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-8",
    "source": "core",
    "text": "A hospital collects patient name, medical history, and insurance details for treatment. It also collects details of the patient's relatives' occupations. Under data minimization:",
    "options": [
      {
        "key": "A",
        "text": "All data is necessary for hospital administration"
      },
      {
        "key": "B",
        "text": "Relative occupation data is not necessary for treatment and violates data minimization"
      },
      {
        "key": "C",
        "text": "All data is valid if the patient signs a consent form"
      },
      {
        "key": "D",
        "text": "Only medical history needs to be minimized"
      }
    ],
    "correct": "B",
    "explanation": "Name, medical history, and insurance details are directly necessary for providing medical treatment. However, the occupation of relatives has no relevance to patient treatment. Collecting such data violates the data minimization principle as it goes beyond what is necessary for the specified purpose.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-9",
    "source": "core",
    "text": "Which Schedule of DPDP Rules 2025 specifically contains standards for processing of personal data that include the data minimization requirement for State and research purposes?",
    "options": [
      {
        "key": "A",
        "text": "First Schedule"
      },
      {
        "key": "B",
        "text": "Second Schedule"
      },
      {
        "key": "C",
        "text": "Third Schedule"
      },
      {
        "key": "D",
        "text": "Fourth Schedule"
      }
    ],
    "correct": "B",
    "explanation": "The Second Schedule of DPDP Rules 2025 (referenced under Rules 5(1) and 16) contains the standards for processing by State instrumentalities and for research/archiving/statistical purposes. It explicitly includes the requirement that processing be limited to data necessary for the specified uses or purposes.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-10",
    "source": "core",
    "text": "Data minimization under DPDPA applies to:",
    "options": [
      {
        "key": "A",
        "text": "Only private sector Data Fiduciaries"
      },
      {
        "key": "B",
        "text": "Only Significant Data Fiduciaries"
      },
      {
        "key": "C",
        "text": "Both private Data Fiduciaries and the State/its instrumentalities"
      },
      {
        "key": "D",
        "text": "Only Data Processors engaged by foreign companies"
      }
    ],
    "correct": "C",
    "explanation": "Data minimization applies universally. For private Data Fiduciaries, it is embedded in Section 6(1) through the consent requirement. For the State and its instrumentalities, it is mandated through the Second Schedule of the DPDP Rules 2025. There is no exemption from data minimization for any category.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "core-p5-11",
    "source": "core",
    "text": "A social media platform requires users to provide their Aadhaar number, PAN card details, and voter ID just to create a basic social media account. This violates:",
    "options": [
      {
        "key": "A",
        "text": "Only the Security principle"
      },
      {
        "key": "B",
        "text": "Only the Consent principle"
      },
      {
        "key": "C",
        "text": "The Data Minimization principle as all three documents are not necessary for a social media account"
      },
      {
        "key": "D",
        "text": "No principle if the user voluntarily provides the documents"
      }
    ],
    "correct": "C",
    "explanation": "Creating a social media account typically requires basic identification. Mandating Aadhaar, PAN, and Voter ID simultaneously goes far beyond what is necessary for the specified purpose (creating a social media account). This violates the data minimization principle under Section 6(1), and even the user's voluntary consent to this would be invalid under Section 6(2) as it infringes the Act.\n\n---\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-2",
    "source": "core",
    "text": "Under Section 8(3) of DPDPA, a Data Fiduciary must ensure accuracy and consistency of personal data when:",
    "options": [
      {
        "key": "A",
        "text": "Any personal data is collected"
      },
      {
        "key": "B",
        "text": "Personal data is stored for more than 1 year"
      },
      {
        "key": "C",
        "text": "Personal data is used to make a decision affecting the Data Principal or disclosed to another Data Fiduciary"
      },
      {
        "key": "D",
        "text": "The Data Principal requests a copy of her data"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(3) specifically triggers the accuracy obligation in two situations: (a) when data is used to make a decision affecting the Data Principal, or (b) when data is disclosed to another Data Fiduciary. This is not a general obligation for all data but specifically applies in these high-stakes situations.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-3",
    "source": "core",
    "text": "A bank shares X's credit report with an insurance company. The credit report contains an error. Under DPDPA, who is responsible for ensuring accuracy before sharing?",
    "options": [
      {
        "key": "A",
        "text": "The insurance company receiving the data"
      },
      {
        "key": "B",
        "text": "The Data Protection Board"
      },
      {
        "key": "C",
        "text": "The bank (Data Fiduciary) sharing the data"
      },
      {
        "key": "D",
        "text": "The credit rating agency that generated the report"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(3) places the obligation of ensuring completeness, accuracy and consistency on the Data Fiduciary — the bank in this case — that is disclosing data to another Data Fiduciary. Before sharing data with the insurance company, the bank must ensure the credit report is accurate.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-4",
    "source": "core",
    "text": "Under Section 12(2), when a Data Principal requests correction of her data, the Data Fiduciary must:",
    "options": [
      {
        "key": "A",
        "text": "Respond within 30 days and then decide whether to correct"
      },
      {
        "key": "B",
        "text": "Seek approval from the Data Protection Board before correcting"
      },
      {
        "key": "C",
        "text": "Correct inaccurate data, complete incomplete data, and update outdated data"
      },
      {
        "key": "D",
        "text": "Provide reasons in writing for not correcting the data"
      }
    ],
    "correct": "C",
    "explanation": "Section 12(2) mandates three actions upon receiving a correction request: (a) correct inaccurate or misleading personal data, (b) complete incomplete personal data, and (c) update the personal data. These are mandatory obligations — the Data Fiduciary cannot refuse a valid correction request.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-5",
    "source": "core",
    "text": "X discovers that a government database has her incorrect date of birth, which has led to denial of a government benefit. X's right to correct this falls under:",
    "options": [
      {
        "key": "A",
        "text": "Section 11 — Right to Access"
      },
      {
        "key": "B",
        "text": "Section 12 — Right to Correction and Erasure"
      },
      {
        "key": "C",
        "text": "Section 13 — Right to Grievance Redressal"
      },
      {
        "key": "D",
        "text": "Section 14 — Right to Nominate"
      }
    ],
    "correct": "B",
    "explanation": "Section 12(1) provides the Data Principal the right to correction, completion, updating and erasure of her personal data. The right to correct an incorrect date of birth in a government database falls squarely within Section 12(1) — the Right to Correction.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-6",
    "source": "core",
    "text": "A company uses inaccurate employee performance data to make a termination decision. Under DPDPA, the company has violated:",
    "options": [
      {
        "key": "A",
        "text": "Section 5 — Notice obligation"
      },
      {
        "key": "B",
        "text": "Section 8(3) — Accuracy obligation when using data for decisions affecting Data Principal"
      },
      {
        "key": "C",
        "text": "Section 9 — Children's data protection"
      },
      {
        "key": "D",
        "text": "Section 10 — Significant Data Fiduciary obligations"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(3) specifically requires that where personal data is used to make a decision affecting the Data Principal, the Data Fiduciary must ensure its completeness, accuracy and consistency. Using inaccurate performance data for a termination decision directly violates this obligation.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-7",
    "source": "core",
    "text": "The Data Accuracy principle under DPDPA also gives Data Principals the right to request erasure of their data. Under Section 12(3), upon such request, the Data Fiduciary must:",
    "options": [
      {
        "key": "A",
        "text": "Always immediately erase all personal data"
      },
      {
        "key": "B",
        "text": "Erase the data unless retention is necessary for the specified purpose or legal compliance"
      },
      {
        "key": "C",
        "text": "Erase only the data that the Data Principal specifies"
      },
      {
        "key": "D",
        "text": "Seek confirmation from the Data Protection Board before erasing"
      }
    ],
    "correct": "B",
    "explanation": "Section 12(3) states that upon receiving an erasure request, the Data Fiduciary shall erase her personal data unless retention of the same is necessary for the specified purpose or for compliance with any law for the time being in force. It is not an absolute right — legal retention requirements can override erasure requests.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-8",
    "source": "core",
    "text": "Which of the following is NOT a right provided to the Data Principal under Section 12 of DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Right to correction of inaccurate data"
      },
      {
        "key": "B",
        "text": "Right to completion of incomplete data"
      },
      {
        "key": "C",
        "text": "Right to compensation for harm caused by inaccurate data"
      },
      {
        "key": "D",
        "text": "Right to erasure of personal data"
      }
    ],
    "correct": "C",
    "explanation": "Section 12 provides rights to correction, completion, updating, and erasure of personal data. It does not provide a direct right to compensation for harm caused by inaccurate data. Compensation or penalty remedies are addressed through the Board's penalty powers under Section 33 and the Schedule to the Act.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-9",
    "source": "core",
    "text": "A healthcare provider must share a patient's medical records with a specialist doctor. Before sharing, the healthcare provider should ensure:",
    "options": [
      {
        "key": "A",
        "text": "The patient re-signs a new consent form"
      },
      {
        "key": "B",
        "text": "The Data Protection Board approves the sharing"
      },
      {
        "key": "C",
        "text": "The medical records are complete, accurate and consistent"
      },
      {
        "key": "D",
        "text": "The records are encrypted before sharing"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(3) requires that when data is disclosed to another Data Fiduciary (the specialist doctor in this case), the Data Fiduciary (healthcare provider) must ensure completeness, accuracy and consistency of the personal data being shared. This is the accuracy obligation in the context of data sharing.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-10",
    "source": "core",
    "text": "Under DPDPA, how should a Data Principal exercise her right to correction?",
    "options": [
      {
        "key": "A",
        "text": "By filing a complaint directly with the Data Protection Board"
      },
      {
        "key": "B",
        "text": "By making a request to the Data Fiduciary in such manner as may be prescribed, using means provided by the Data Fiduciary"
      },
      {
        "key": "C",
        "text": "By sending a registered legal notice to the Data Fiduciary"
      },
      {
        "key": "D",
        "text": "By approaching a civil court for an injunction"
      }
    ],
    "correct": "B",
    "explanation": "Section 12(3) and Rule 14 of DPDP Rules 2025 govern how a Data Principal exercises correction rights. She must make a request to the Data Fiduciary using the means provided by the Data Fiduciary and furnishing the particulars required. Before approaching the Board, she must exhaust grievance redressal under Section 13.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "core-p6-11",
    "source": "core",
    "text": "A social media platform uses outdated relationship status information of a user to determine eligibility for a couples' promotional offer, without updating it when the user changed it. The platform has violated:",
    "options": [
      {
        "key": "A",
        "text": "Only the consent principle"
      },
      {
        "key": "B",
        "text": "Section 8(3) — accuracy obligation when using data for decisions affecting the Data Principal"
      },
      {
        "key": "C",
        "text": "Only the storage limitation principle"
      },
      {
        "key": "D",
        "text": "No principle as relationship status is not sensitive data"
      }
    ],
    "correct": "B",
    "explanation": "The platform used personal data (relationship status) to make a decision (promotional eligibility) affecting the Data Principal without ensuring its accuracy. This violates Section 8(3) which requires the Data Fiduciary to ensure completeness, accuracy and consistency when using data to make decisions affecting the Data Principal.\n\n---\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-2",
    "source": "core",
    "text": "Under Section 8(7) of DPDPA, when must a Data Fiduciary erase personal data?",
    "options": [
      {
        "key": "A",
        "text": "After 3 years from date of collection"
      },
      {
        "key": "B",
        "text": "Upon withdrawal of consent or when the specified purpose is no longer being served"
      },
      {
        "key": "C",
        "text": "After the Data Principal turns 18"
      },
      {
        "key": "D",
        "text": "Only upon an order from the Data Protection Board"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(7) specifies two triggers for erasure: (a) upon the Data Principal withdrawing her consent, or (b) as soon as it is reasonable to assume that the specified purpose is no longer being served — whichever is earlier. This is subject to the exception of legal retention requirements.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-3",
    "source": "core",
    "text": "Under the Third Schedule of DPDP Rules 2025, for a social media intermediary with 2 crore registered users, the data retention period is:",
    "options": [
      {
        "key": "A",
        "text": "1 year from date of collection"
      },
      {
        "key": "B",
        "text": "5 years from account creation"
      },
      {
        "key": "C",
        "text": "3 years from the date the Data Principal last approached the Fiduciary or exercised rights"
      },
      {
        "key": "D",
        "text": "Indefinite until the user deletes their account"
      }
    ],
    "correct": "C",
    "explanation": "The Third Schedule specifies that for a social media intermediary with not less than 2 crore registered users, data must be erased 3 years from the date on which the Data Principal last approached the Data Fiduciary for the performance of the specified purpose or exercise of her rights, or the commencement of the Rules — whichever is latest.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-4",
    "source": "core",
    "text": "Under Rule 8(2), a Data Fiduciary must inform the Data Principal of upcoming data erasure:",
    "options": [
      {
        "key": "A",
        "text": "72 hours before erasure"
      },
      {
        "key": "B",
        "text": "48 hours before erasure"
      },
      {
        "key": "C",
        "text": "24 hours before erasure"
      },
      {
        "key": "D",
        "text": "7 days before erasure"
      }
    ],
    "correct": "B",
    "explanation": "Rule 8(2) specifically states that at least forty-eight hours before completion of the time period for erasure, the Data Fiduciary shall inform the Data Principal that such personal data shall be erased upon completion of such period, unless she logs into her account or contacts the Fiduciary.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-5",
    "source": "core",
    "text": "Under Rule 8(3), all Data Fiduciaries must retain processing logs and personal data for a minimum period of:",
    "options": [
      {
        "key": "A",
        "text": "6 months from the date of processing"
      },
      {
        "key": "B",
        "text": "1 year from the date of processing"
      },
      {
        "key": "C",
        "text": "3 years from the date of processing"
      },
      {
        "key": "D",
        "text": "5 years from the date of processing"
      }
    ],
    "correct": "B",
    "explanation": "Rule 8(3) requires that without prejudice to the erasure obligations, a Data Fiduciary shall retain personal data, associated traffic data and other logs of processing for a minimum period of one year from the date of such processing, after which the data and logs must be erased unless law requires longer retention.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-6",
    "source": "core",
    "text": "X purchases an e-book on platform Y. After delivery, Y must retain order details, personal data and processing logs for at least:",
    "options": [
      {
        "key": "A",
        "text": "6 months"
      },
      {
        "key": "B",
        "text": "1 year from the date of the transaction"
      },
      {
        "key": "C",
        "text": "3 years from the date of the transaction"
      },
      {
        "key": "D",
        "text": "Until X deletes her account"
      }
    ],
    "correct": "B",
    "explanation": "This is Case 1 from the Illustration under Rule 8(3). The platform Y must retain order details, personal data and logs (such as order confirmation, payment and delivery events) for at least one year from the date of the transaction, even if X deletes her account.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-7",
    "source": "core",
    "text": "An online gaming intermediary has 60 lakh registered users in India. Under the Third Schedule, what is the data retention period for this intermediary?",
    "options": [
      {
        "key": "A",
        "text": "1 year"
      },
      {
        "key": "B",
        "text": "2 years"
      },
      {
        "key": "C",
        "text": "3 years from last contact by Data Principal"
      },
      {
        "key": "D",
        "text": "This intermediary does not fall under the Third Schedule"
      }
    ],
    "correct": "C",
    "explanation": "The Third Schedule specifies that an online gaming intermediary with not less than 50 lakh registered users (60 lakh qualifies) must retain data for three years from the date the Data Principal last approached the Fiduciary for the specified purpose or exercise of rights, or commencement of the Rules — whichever is latest.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-8",
    "source": "core",
    "text": "Company X engages cloud service provider C as its Data Processor. Under Rule 8(3), regarding log retention:",
    "options": [
      {
        "key": "A",
        "text": "Only X needs to retain logs; C is not responsible"
      },
      {
        "key": "B",
        "text": "Only C needs to retain logs as it hosts the data"
      },
      {
        "key": "C",
        "text": "X must ensure that C also retains data and logs for at least one year"
      },
      {
        "key": "D",
        "text": "Both X and C must independently retain logs for 3 years each"
      }
    ],
    "correct": "C",
    "explanation": "This is Case 2 from the Illustration under Rule 8(3). X as the Data Fiduciary is required to ensure that C (the Data Processor) also retains the data and associated logs for at least one year before erasure, unless any other applicable law requires a longer period. The obligation flows from Fiduciary to Processor.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-9",
    "source": "core",
    "text": "The storage limitation principle contains an important exception. Data need not be erased when:",
    "options": [
      {
        "key": "A",
        "text": "The Data Fiduciary's business requires ongoing use"
      },
      {
        "key": "B",
        "text": "The data is encrypted and secured"
      },
      {
        "key": "C",
        "text": "Retention is necessary for compliance with any law in force"
      },
      {
        "key": "D",
        "text": "The data belongs to a Significant Data Fiduciary"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(7) and Rule 8(1) both contain the same exception — data need not be erased if its retention is necessary for compliance with any law for the time being in force. This ensures DPDPA's storage limitation does not conflict with other laws that mandate specific retention periods.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-10",
    "source": "core",
    "text": "Under storage limitation, which data retention period takes precedence — the period under DPDPA or a longer period under another applicable law?",
    "options": [
      {
        "key": "A",
        "text": "DPDPA always takes precedence"
      },
      {
        "key": "B",
        "text": "The shorter period always applies"
      },
      {
        "key": "C",
        "text": "The longer period required by the other applicable law takes precedence"
      },
      {
        "key": "D",
        "text": "The Data Protection Board determines which applies case by case"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(7) and Rule 8(1) both use the phrase \"unless its retention is necessary for compliance with any law for the time being in force.\" This means if another law (like banking regulations, tax laws etc.) requires a longer retention period, that longer period takes precedence over DPDPA's erasure obligation.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "core-p7-11",
    "source": "core",
    "text": "Which of the following correctly describes the virtual token exception to data erasure under the Third Schedule?",
    "options": [
      {
        "key": "A",
        "text": "Virtual tokens must always be deleted when other data is erased"
      },
      {
        "key": "B",
        "text": "Virtual tokens that can be used to get money, goods or services are excluded from the 3-year erasure obligation"
      },
      {
        "key": "C",
        "text": "Virtual tokens are exempt from all DPDPA provisions"
      },
      {
        "key": "D",
        "text": "Virtual tokens require separate consent for retention"
      }
    ],
    "correct": "B",
    "explanation": "The Third Schedule specifically excludes from the 3-year erasure obligation the enabling of the Data Principal to access any virtual token that is issued by or on behalf of the Data Fiduciary, stored on the Fiduciary's digital platform, and may be used to get money, goods or services. Such tokens (like loyalty points or digital wallet balances) are exempt from the time-based erasure rule.\n\n---\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-2",
    "source": "core",
    "text": "Under Rule 6 of DPDP Rules 2025, which of the following is NOT listed as a minimum security safeguard?",
    "options": [
      {
        "key": "A",
        "text": "Encryption, obfuscation or masking of personal data"
      },
      {
        "key": "B",
        "text": "Access controls on computer resources"
      },
      {
        "key": "C",
        "text": "Purchase of cybersecurity insurance"
      },
      {
        "key": "D",
        "text": "Logs and monitoring for unauthorized access detection"
      }
    ],
    "correct": "C",
    "explanation": "Rule 6 lists specific minimum security safeguards including encryption, access controls, logs and monitoring, data backups, log retention, security provisions in Data Processor contracts, and technical/organisational measures. Cybersecurity insurance is not listed as a mandatory safeguard under Rule 6.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-3",
    "source": "core",
    "text": "Under Rule 7(2), a Data Fiduciary must provide detailed breach information to the Data Protection Board within:",
    "options": [
      {
        "key": "A",
        "text": "24 hours of becoming aware"
      },
      {
        "key": "B",
        "text": "48 hours of becoming aware"
      },
      {
        "key": "C",
        "text": "72 hours of becoming aware"
      },
      {
        "key": "D",
        "text": "7 days of becoming aware"
      }
    ],
    "correct": "C",
    "explanation": "Rule 7(2)(b) specifies that within seventy-two hours of becoming aware of the breach (or within a longer period allowed by the Board on written request), the Data Fiduciary must provide updated and detailed information including breach details, facts, mitigation measures, findings about the perpetrator, remedial measures, and a report on Data Principal notifications.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-4",
    "source": "core",
    "text": "When a personal data breach occurs, a Data Fiduciary must notify affected Data Principals:",
    "options": [
      {
        "key": "A",
        "text": "Within 72 hours"
      },
      {
        "key": "B",
        "text": "Within 30 days"
      },
      {
        "key": "C",
        "text": "Without delay, through their user account or registered communication means"
      },
      {
        "key": "D",
        "text": "Only after completing investigation of the breach"
      }
    ],
    "correct": "C",
    "explanation": "Rule 7(1) requires that upon becoming aware of any personal data breach, the Data Fiduciary shall, to the best of its knowledge, intimate to each affected Data Principal in a concise, clear and plain manner and WITHOUT DELAY. Notification must happen immediately, not after investigation.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-5",
    "source": "core",
    "text": "Under DPDPA, \"personal data breach\" is defined as:",
    "options": [
      {
        "key": "A",
        "text": "Only intentional unauthorized access to personal data"
      },
      {
        "key": "B",
        "text": "Any unauthorized processing OR accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access to personal data"
      },
      {
        "key": "C",
        "text": "Only large-scale data breaches affecting more than 1,000 users"
      },
      {
        "key": "D",
        "text": "Only breaches reported to the Data Protection Board"
      }
    ],
    "correct": "B",
    "explanation": "Section 2(u) defines personal data breach broadly as \"any unauthorised processing of personal data or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access to personal data, that compromises the confidentiality, integrity or availability of personal data.\" It covers both intentional and accidental breaches.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-6",
    "source": "core",
    "text": "Under Rule 6(1)(e), Data Fiduciaries must retain logs and personal data for unauthorized access detection for a period of:",
    "options": [
      {
        "key": "A",
        "text": "6 months"
      },
      {
        "key": "B",
        "text": "1 year unless law requires otherwise"
      },
      {
        "key": "C",
        "text": "3 years"
      },
      {
        "key": "D",
        "text": "Until the Data Principal requests deletion"
      }
    ],
    "correct": "B",
    "explanation": "Rule 6(1)(e) requires that for enabling detection, investigation and remediation of unauthorized access and continued processing, the Data Fiduciary shall retain such logs and personal data for a period of one year, unless compliance with any law for the time being in force requires otherwise.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-7",
    "source": "core",
    "text": "What information must a Data Fiduciary include in the breach notification to affected Data Principals under Rule 7(1)?",
    "options": [
      {
        "key": "A",
        "text": "Only the nature and extent of the breach"
      },
      {
        "key": "B",
        "text": "Nature of breach, consequences, mitigation measures, safety steps the Data Principal can take, and contact information"
      },
      {
        "key": "C",
        "text": "Only the steps taken to fix the breach"
      },
      {
        "key": "D",
        "text": "The identity of the person who caused the breach"
      }
    ],
    "correct": "B",
    "explanation": "Rule 7(1) requires the notification to Data Principals to include: (a) description of breach including nature, extent and timing; (b) likely consequences relevant to the Data Principal; (c) measures implemented to mitigate risk; (d) safety measures the Data Principal may take; and (e) business contact information of a person who can respond to queries.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-8",
    "source": "core",
    "text": "Rule 6(1)(f) requires that where a Data Processor is engaged, the contract between the Data Fiduciary and Data Processor must:",
    "options": [
      {
        "key": "A",
        "text": "Be approved by the Data Protection Board"
      },
      {
        "key": "B",
        "text": "Include appropriate provisions for taking reasonable security safeguards"
      },
      {
        "key": "C",
        "text": "Be registered with the Ministry of Electronics and IT"
      },
      {
        "key": "D",
        "text": "Be renewed annually"
      }
    ],
    "correct": "B",
    "explanation": "Rule 6(1)(f) specifically requires appropriate provision in the contract entered into between the Data Fiduciary and the Data Processor, wherever applicable, for taking reasonable security safeguards. This ensures security obligations flow contractually from Fiduciary to Processor.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-9",
    "source": "core",
    "text": "Which section of DPDPA grants the Data Protection Board the power to direct urgent remedial or mitigation measures upon receiving a breach intimation?",
    "options": [
      {
        "key": "A",
        "text": "Section 8(5)"
      },
      {
        "key": "B",
        "text": "Section 8(6)"
      },
      {
        "key": "C",
        "text": "Section 27(1)(a)"
      },
      {
        "key": "D",
        "text": "Section 33(1)"
      }
    ],
    "correct": "C",
    "explanation": "Section 27(1)(a) gives the Board the power to, on receipt of an intimation of personal data breach under Section 8(6), direct any urgent remedial or mitigation measures and inquire into such breach and impose penalty. This is distinct from Section 8's general security obligation on Data Fiduciaries.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-10",
    "source": "core",
    "text": "What is the maximum penalty for breach of reasonable security safeguards obligation under Section 8(5) of DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "₹50 crore"
      },
      {
        "key": "B",
        "text": "₹100 crore"
      },
      {
        "key": "C",
        "text": "₹200 crore"
      },
      {
        "key": "D",
        "text": "₹250 crore"
      }
    ],
    "correct": "D",
    "explanation": "The Schedule to the DPDPA specifies the penalties. Breach in observing the obligation of Data Fiduciary to take reasonable security safeguards to prevent personal data breach under sub-section (5) of Section 8 attracts the highest penalty — up to ₹250 crore.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "core-p8-11",
    "source": "core",
    "text": "Under Rule 7(2)(a), what must a Data Fiduciary immediately notify the Board upon becoming aware of a breach?",
    "options": [
      {
        "key": "A",
        "text": "A full detailed investigation report"
      },
      {
        "key": "B",
        "text": "A brief description of the breach including its nature, extent, timing, location and likely impact"
      },
      {
        "key": "C",
        "text": "Only the number of Data Principals affected"
      },
      {
        "key": "D",
        "text": "A list of security measures being implemented"
      }
    ],
    "correct": "B",
    "explanation": "Rule 7(2)(a) requires that without delay, the Data Fiduciary must notify the Board a description of the breach, including its nature, extent, timing and location of occurrence and the likely impact. This initial notification is followed by the more detailed 72-hour report under Rule 7(2)(b).\n\n---\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-2",
    "source": "core",
    "text": "Under Section 8(1) of DPDPA, a Data Fiduciary is responsible for DPDPA compliance:",
    "options": [
      {
        "key": "A",
        "text": "Only for processing it directly undertakes"
      },
      {
        "key": "B",
        "text": "Only if the Data Principal fulfills her duties under the Act"
      },
      {
        "key": "C",
        "text": "For all processing undertaken by it or on its behalf by a Data Processor, irrespective of any agreement"
      },
      {
        "key": "D",
        "text": "Only for processing done in India"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(1) explicitly states that a Data Fiduciary shall be responsible for complying with DPDPA in respect of any processing undertaken by it or on its behalf by a Data Processor — irrespective of any agreement to the contrary or failure of the Data Principal to carry out duties. Accountability cannot be contracted away.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-3",
    "source": "core",
    "text": "A Data Fiduciary outsources data processing to a Data Processor who causes a data breach. Who is accountable under DPDPA?",
    "options": [
      {
        "key": "A",
        "text": "Only the Data Processor who caused the breach"
      },
      {
        "key": "B",
        "text": "The Data Fiduciary and the Data Processor jointly"
      },
      {
        "key": "C",
        "text": "The Data Fiduciary remains ultimately responsible even for actions of the Data Processor"
      },
      {
        "key": "D",
        "text": "Accountability depends on the contractual terms between them"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(1) makes the Data Fiduciary responsible for all processing, including that done by Data Processors on its behalf, irrespective of any agreement. The Data Fiduciary cannot use outsourcing as a shield from accountability. While the Data Processor may also be liable, the Fiduciary's accountability remains.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-4",
    "source": "core",
    "text": "Under Section 8(2), a Data Fiduciary may engage a Data Processor:",
    "options": [
      {
        "key": "A",
        "text": "Through a verbal authorization"
      },
      {
        "key": "B",
        "text": "Only with prior approval of the Data Protection Board"
      },
      {
        "key": "C",
        "text": "Only under a valid contract"
      },
      {
        "key": "D",
        "text": "Only if the Data Processor is registered with the Board"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(2) specifically states that a Data Fiduciary may engage, appoint, use or otherwise involve a Data Processor to process personal data on its behalf only under a valid contract. This contractual requirement is a key accountability mechanism ensuring the Fiduciary maintains control and responsibility.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-5",
    "source": "core",
    "text": "Under Rule 13(1), how often must a Significant Data Fiduciary undertake a Data Protection Impact Assessment and audit?",
    "options": [
      {
        "key": "A",
        "text": "Every 6 months"
      },
      {
        "key": "B",
        "text": "Once every 12 months from the date of notification"
      },
      {
        "key": "C",
        "text": "Every 2 years"
      },
      {
        "key": "D",
        "text": "Only when directed by the Data Protection Board"
      }
    ],
    "correct": "B",
    "explanation": "Rule 13(1) states that a Significant Data Fiduciary shall, once in every period of twelve months from the date on which it is notified as such or included in the class of Data Fiduciaries notified as such, undertake a Data Protection Impact Assessment and an audit. This is an annual mandatory requirement.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-6",
    "source": "core",
    "text": "Under Section 10(2)(a), a Data Protection Officer (DPO) appointed by a Significant Data Fiduciary must:",
    "options": [
      {
        "key": "A",
        "text": "Be a qualified lawyer with 10 years of experience"
      },
      {
        "key": "B",
        "text": "Be based in India and be responsible to the Board of Directors"
      },
      {
        "key": "C",
        "text": "Be approved by the Data Protection Board"
      },
      {
        "key": "D",
        "text": "Be a government nominee with data governance expertise"
      }
    ],
    "correct": "B",
    "explanation": "Section 10(2)(a) specifies that the DPO must: (i) represent the Significant Data Fiduciary under the Act, (ii) be based in India, (iii) be an individual responsible to the Board of Directors or similar governing body, and (iv) be the point of contact for the grievance redressal mechanism. Being based in India and responsible to the Board of Directors are key accountability requirements.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-7",
    "source": "core",
    "text": "Under Rule 13(2), the Data Protection Impact Assessment report must be furnished to the Board by:",
    "options": [
      {
        "key": "A",
        "text": "The Significant Data Fiduciary directly"
      },
      {
        "key": "B",
        "text": "The DPO of the Significant Data Fiduciary"
      },
      {
        "key": "C",
        "text": "The person carrying out the DPIA and audit"
      },
      {
        "key": "D",
        "text": "The Central Government on behalf of the Significant Data Fiduciary"
      }
    ],
    "correct": "C",
    "explanation": "Rule 13(2) states that a Significant Data Fiduciary shall cause the person carrying out the Data Protection Impact Assessment and audit to furnish to the Board a report containing significant observations. This ensures independence — the report comes directly from the assessor to the Board.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-8",
    "source": "core",
    "text": "Which of the following factors is NOT considered by the Central Government when notifying a Data Fiduciary as a Significant Data Fiduciary under Section 10(1)?",
    "options": [
      {
        "key": "A",
        "text": "Volume and sensitivity of personal data processed"
      },
      {
        "key": "B",
        "text": "Risk to the rights of Data Principals"
      },
      {
        "key": "C",
        "text": "Annual revenue and market capitalization of the Data Fiduciary"
      },
      {
        "key": "D",
        "text": "Risk to electoral democracy"
      }
    ],
    "correct": "C",
    "explanation": "Section 10(1) lists the relevant factors for notification as Significant Data Fiduciary: volume and sensitivity of data, risk to Data Principal rights, potential impact on sovereignty and integrity, risk to electoral democracy, security of the State, and public order. Annual revenue and market capitalization are not listed as factors.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-9",
    "source": "core",
    "text": "Under Rule 13(3), a Significant Data Fiduciary must verify that its algorithmic software used for processing is:",
    "options": [
      {
        "key": "A",
        "text": "Approved by the Central Government's cybersecurity agency"
      },
      {
        "key": "B",
        "text": "Not likely to pose a risk to the rights of Data Principals"
      },
      {
        "key": "C",
        "text": "Open-source and publicly accessible"
      },
      {
        "key": "D",
        "text": "Certified by an independent IT auditor annually"
      }
    ],
    "correct": "B",
    "explanation": "Rule 13(3) requires that a Significant Data Fiduciary shall observe due diligence to verify that technical measures including algorithmic software adopted by it for hosting, display, uploading, modification, publishing, transmission, storage, updating or sharing of personal data processed by it are not likely to pose a risk to the rights of Data Principals.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-10",
    "source": "core",
    "text": "Under Section 8(4), the accountability principle requires that a Data Fiduciary implement:",
    "options": [
      {
        "key": "A",
        "text": "A dedicated cybersecurity team"
      },
      {
        "key": "B",
        "text": "Appropriate technical and organisational measures to ensure effective observance of DPDPA"
      },
      {
        "key": "C",
        "text": "Board-approved compliance framework"
      },
      {
        "key": "D",
        "text": "ISO 27001 certified information security management system"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(4) states that a Data Fiduciary shall implement appropriate technical and organisational measures to ensure effective observance of the provisions of the Act and rules made thereunder. This is a broad accountability obligation that requires proactive systemic measures — not just reactive compliance.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "core-p9-11",
    "source": "core",
    "text": "Under Rule 13(4), a Significant Data Fiduciary may be required to ensure that specified personal data is processed subject to data localization restrictions. Who recommends which data must be localized?",
    "options": [
      {
        "key": "A",
        "text": "The Data Protection Board"
      },
      {
        "key": "B",
        "text": "The Ministry of Electronics and Information Technology"
      },
      {
        "key": "C",
        "text": "A committee constituted by the Central Government"
      },
      {
        "key": "D",
        "text": "The Data Fiduciary itself based on risk assessment"
      }
    ],
    "correct": "C",
    "explanation": "Rule 13(4) and 13(5) state that a Significant Data Fiduciary shall ensure that personal data specified by the Central Government, on the basis of recommendations of a committee constituted by it, is processed subject to the restriction that it is not transferred outside India. The committee includes officials from the Ministry of Electronics and Technology and may include other ministry officials.\n\n---\n\n---\n\n# SUMMARY QUICK REFERENCE\n\n| #   | Principle             | Key Section                | Core Requirement                                     |\n| --- | --------------------- | -------------------------- | ---------------------------------------------------- |\n| 1   | Lawful Processing     | Section 4                  | Consent or Legitimate Use                            |\n| 2   | Notice & Transparency | Section 5, Rule 3          | Prior clear notice in plain language                 |\n| 3   | Consent               | Section 6                  | Free, Specific, Informed, Unconditional, Unambiguous |\n| 4   | Purpose Limitation    | Section 6(1), 8(7)         | Use data only for stated purpose                     |\n| 5   | Data Minimization     | Section 6(1), 2nd Schedule | Collect only necessary data                          |\n| 6   | Data Accuracy         | Section 8(3), 12           | Ensure accuracy; right to correction                 |\n| 7   | Storage Limitation    | Section 8(7), Rule 8       | Erase when purpose served; 3-year limit              |\n| 8   | Security & Integrity  | Section 8(5), Rule 6, 7    | Safeguards + 72-hour breach notification             |\n| 9   | Accountability        | Section 8(1), 8(4), 10     | Full responsibility; DPIA; DPO                       |\n\n---\n\n# PENALTY REFERENCE\n\n| Violation                                   | Maximum Penalty |\n| ------------------------------------------- | --------------- |\n| Breach of security safeguards (S.8(5))      | ₹250 Crore      |\n| Failure to notify breach (S.8(6))           | ₹200 Crore      |\n| Breach of children's data obligations (S.9) | ₹200 Crore      |\n| Breach by Significant Data Fiduciary (S.10) | ₹150 Crore      |\n| Breach of Data Principal duties (S.15)      | ₹10,000         |\n| Breach of voluntary undertaking (S.32)      | As applicable   |\n| Any other breach                            | ₹50 Crore       |\n\n---\n\n_Document prepared based on the Digital Personal Data Protection Act, 2023 (No. 22 of 2023) and Digital Personal Data Protection Rules, 2025 (notified on 13th November, 2025)_\n\n_Total: 9 Principles × 10 MCQs = 90 Questions_"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-2",
    "source": "sector",
    "text": "A private bank collects and processes the KYC data of a customer to comply with RBI's Know-Your-Customer guidelines. Under DPDPA, this processing is:",
    "options": [
      {
        "key": "A",
        "text": "Unlawful as the customer has not given explicit consent under DPDPA"
      },
      {
        "key": "B",
        "text": "Lawful under Section 7(d) as it fulfills an obligation under law to disclose information to the State"
      },
      {
        "key": "C",
        "text": "Unlawful unless the bank is a Significant Data Fiduciary"
      },
      {
        "key": "D",
        "text": "Lawful only if the customer signs a DPDPA-specific consent form"
      }
    ],
    "correct": "B",
    "explanation": "Section 7(d) allows processing for fulfilling any obligation under any law in force in India to disclose information to the State or its instrumentalities. KYC compliance under RBI regulations is a statutory obligation, making such processing lawful without requiring separate DPDPA consent.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-3",
    "source": "sector",
    "text": "An insurance company processes a policyholder's medical records to assess her claim. The company later uses the same data to market new health plans without seeking fresh consent. The marketing use is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as the data was already collected"
      },
      {
        "key": "B",
        "text": "Lawful if disclosed in the policy document"
      },
      {
        "key": "C",
        "text": "Unlawful as marketing is not a legitimate use under Section 7 and requires fresh consent"
      },
      {
        "key": "D",
        "text": "Lawful as the insurance company is a licensed entity"
      }
    ],
    "correct": "C",
    "explanation": "Under Section 7, marketing is not listed as a legitimate use for processing without consent. The claim assessment was lawful, but using the same data for marketing constitutes a new purpose requiring fresh and explicit consent from the policyholder under Section 6.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-4",
    "source": "sector",
    "text": "A bank processes customer data to comply with a court order for disclosure in a loan default recovery case. This is lawful under which provision?",
    "options": [
      {
        "key": "A",
        "text": "Section 7(a) — voluntary provision of data"
      },
      {
        "key": "B",
        "text": "Section 7(e) — compliance with a judgment or decree"
      },
      {
        "key": "C",
        "text": "Section 7(b) — State provision of services"
      },
      {
        "key": "D",
        "text": "Section 6 — consent of Data Principal"
      }
    ],
    "correct": "B",
    "explanation": "Section 7(e) specifically allows processing for compliance with any judgment or decree or order issued under any law in force in India. A court order for disclosure in a loan default recovery case directly falls under this provision.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-5",
    "source": "sector",
    "text": "A fintech company processes customer financial data claiming it is for \"AI model training to improve services.\" Under DPDPA, this processing is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as it improves customer experience"
      },
      {
        "key": "B",
        "text": "Lawful if the AI model is developed in India"
      },
      {
        "key": "C",
        "text": "Unlawful as AI model training is not a legitimate use under Section 7 and requires explicit consent"
      },
      {
        "key": "D",
        "text": "Lawful if disclosed in the terms and conditions"
      }
    ],
    "correct": "C",
    "explanation": "AI model training is not listed as a legitimate use under Section 7. Without explicit consent from the customer, using their financial data for AI training is unlawful under Section 4. The fintech company must obtain specific informed consent for this purpose.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-6",
    "source": "sector",
    "text": "An insurer processes data of a policyholder to ascertain her financial information after she defaults on premium payments. This falls under:",
    "options": [
      {
        "key": "A",
        "text": "Section 7(b) — State benefit provision"
      },
      {
        "key": "B",
        "text": "Section 7(f) — ascertaining financial information of a defaulter"
      },
      {
        "key": "C",
        "text": "Section 6 — explicit consent"
      },
      {
        "key": "D",
        "text": "Section 9 — children's data processing"
      }
    ],
    "correct": "B",
    "explanation": "Section 17(1)(f) allows processing for ascertaining financial information and assets and liabilities of any person who has defaulted in payment due on account of a loan or advance taken from a financial institution. Insurance premium default falls within this category.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-7",
    "source": "sector",
    "text": "A bank shares customer data with the Financial Intelligence Unit (FIU) under the Prevention of Money Laundering Act (PMLA). Under DPDPA, this sharing is:",
    "options": [
      {
        "key": "A",
        "text": "Unlawful as customer consent is not obtained"
      },
      {
        "key": "B",
        "text": "Lawful under Section 7(d) as it fulfills a legal obligation to disclose information to the State"
      },
      {
        "key": "C",
        "text": "Unlawful unless approved by the Data Protection Board"
      },
      {
        "key": "D",
        "text": "Lawful only for amounts above ₹10 lakhs"
      }
    ],
    "correct": "B",
    "explanation": "PMLA mandates reporting suspicious transactions to FIU-India. This is a statutory obligation. Section 7(d) covers processing for fulfilling any obligation under any law in force in India to disclose information to the State or its instrumentalities, making such sharing lawful without customer consent.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-8",
    "source": "sector",
    "text": "An NBFC collects customer data through its mobile app for loan processing. It also quietly enrolls customers in a third-party loyalty rewards program without informing them. The enrollment is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as loyalty programs benefit the customer"
      },
      {
        "key": "B",
        "text": "Lawful if mentioned in the app's general terms"
      },
      {
        "key": "C",
        "text": "Unlawful as neither consent nor a legitimate use under Section 7 covers undisclosed third-party enrollment"
      },
      {
        "key": "D",
        "text": "Lawful if the NBFC and the loyalty program are affiliated companies"
      }
    ],
    "correct": "C",
    "explanation": "Section 4 requires all processing to be either consented to or covered by a legitimate use. Silently enrolling customers in a third-party program without their knowledge satisfies neither requirement. There is no informed consent and no applicable Section 7 legitimate use for this purpose.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-9",
    "source": "sector",
    "text": "A life insurance company processes customer health data to assess mortality risk for actuarial calculations. This processing is:",
    "options": [
      {
        "key": "A",
        "text": "Unlawful as health data is sensitive"
      },
      {
        "key": "B",
        "text": "Lawful as it is for the specified purpose of insurance underwriting with customer consent"
      },
      {
        "key": "C",
        "text": "Lawful only if the company is a Significant Data Fiduciary"
      },
      {
        "key": "D",
        "text": "Unlawful without RBI approval"
      }
    ],
    "correct": "B",
    "explanation": "Processing health data for insurance underwriting and actuarial calculations is the specified purpose for which the customer provides data when applying for a life insurance policy. With proper consent obtained under Section 6, such processing is lawful. The customer provides this data knowing it will be used for risk assessment.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-10",
    "source": "sector",
    "text": "A payment aggregator processes transaction data of merchants to generate risk scores and then sells these risk scores to third parties for profit. The sale of risk scores is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as risk scores are derived data, not personal data"
      },
      {
        "key": "B",
        "text": "Lawful if the merchant agreed to general terms of service"
      },
      {
        "key": "C",
        "text": "Unlawful as selling derived personal data to third parties is not a legitimate use and requires explicit consent"
      },
      {
        "key": "D",
        "text": "Lawful as payment aggregators are regulated by RBI"
      }
    ],
    "correct": "C",
    "explanation": "Risk scores derived from a merchant's transaction data are personal data as they are identifiable to that merchant. Selling such data to third parties is not a legitimate use under Section 7. Such processing requires explicit, specific consent from the merchant for this commercial purpose.\n\n---"
  },
  {
    "principleNo": 1,
    "id": "sector-p1-11",
    "source": "sector",
    "text": "A cooperative bank in a rural area processes customer data to help a government agricultural scheme identify eligible beneficiaries. This processing is lawful under:",
    "options": [
      {
        "key": "A",
        "text": "Section 6 — customer consent"
      },
      {
        "key": "B",
        "text": "Section 7(b) — State provision of subsidy, benefit or service"
      },
      {
        "key": "C",
        "text": "Section 7(i) — employment-related processing"
      },
      {
        "key": "D",
        "text": "Section 10 — Significant Data Fiduciary obligations"
      }
    ],
    "correct": "B",
    "explanation": "Section 7(b) allows the State and its instrumentalities to process personal data for providing subsidies, benefits, services, certificates, licences or permits. A cooperative bank assisting a government agricultural scheme to identify eligible beneficiaries falls within this legitimate use provision.\n\n---\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-2",
    "source": "sector",
    "text": "A bank sends a customer a 30-page account opening form that contains a one-line data collection clause buried on page 25. Under Rule 3 of DPDP Rules 2025, this notice is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as the information is technically present in the document"
      },
      {
        "key": "B",
        "text": "Valid if the customer signs the form"
      },
      {
        "key": "C",
        "text": "Invalid as it violates the requirement of being independently understandable"
      },
      {
        "key": "D",
        "text": "Valid if the RBI approves the form format"
      }
    ],
    "correct": "C",
    "explanation": "Rule 3(a) requires that notice must be presented and be understandable independently of any other information. A one-line clause buried in a 30-page form does not meet this standard. The DPDPA requires that notice be standalone, clear, and accessible — not embedded in lengthy documentation.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-3",
    "source": "sector",
    "text": "An insurance company's app collects a customer's location data. The notice for this must include:",
    "options": [
      {
        "key": "A",
        "text": "Only the fact that location data is collected"
      },
      {
        "key": "B",
        "text": "An itemised description of what location data is collected and the specific purpose for which it is used"
      },
      {
        "key": "C",
        "text": "A general statement that \"various data may be collected for service improvement\""
      },
      {
        "key": "D",
        "text": "Only the link to the privacy policy"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3(b)(i) and (ii) require the notice to include an itemised description of the personal data being collected and the specified purpose, along with specific description of goods or services to be provided through such processing. Generic statements do not meet the itemised description requirement.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-4",
    "source": "sector",
    "text": "A customer opened a bank account before DPDPA came into force. After the Act's commencement, the bank must:",
    "options": [
      {
        "key": "A",
        "text": "Immediately close the account and seek fresh account opening"
      },
      {
        "key": "B",
        "text": "Give the customer a fresh notice describing the data processed and the purpose, as soon as reasonably practicable"
      },
      {
        "key": "C",
        "text": "Do nothing as pre-existing banking relationships are exempt"
      },
      {
        "key": "D",
        "text": "Get RBI to notify the customer on its behalf"
      }
    ],
    "correct": "B",
    "explanation": "Section 5(2) specifically addresses pre-existing consents. The bank may continue processing the customer's data but must, as soon as reasonably practicable, give the customer a notice informing her of the personal data processed, the purpose, how to exercise rights, and how to complain to the Board.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-5",
    "source": "sector",
    "text": "A health insurance policy renewal notice contains data processing information only in English. The policyholder is a Tamil-speaking customer who requested Tamil communication. Under DPDPA, this notice is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as English is the official language of business"
      },
      {
        "key": "B",
        "text": "Invalid as DPDPA requires the option to receive notice in Tamil, which is in the Eighth Schedule"
      },
      {
        "key": "C",
        "text": "Valid if the insurer's policy documents are approved by IRDAI in English"
      },
      {
        "key": "D",
        "text": "Valid as the customer can use a translator"
      }
    ],
    "correct": "B",
    "explanation": "Section 5(3) requires the Data Fiduciary to give the Data Principal the option to access the contents of the notice in English or any language specified in the Eighth Schedule to the Constitution. Tamil is in the Eighth Schedule. The customer must be given the option of accessing the notice in Tamil.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-6",
    "source": "sector",
    "text": "A bank's notice to customers mentions data will be used for \"banking services\" without specifying what services or what data will be processed. Under Rule 3, this notice is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as banking services is a well-understood term"
      },
      {
        "key": "B",
        "text": "Valid if supplemented by a detailed privacy policy link"
      },
      {
        "key": "C",
        "text": "Invalid as it does not provide an itemised description of data and specific purpose"
      },
      {
        "key": "D",
        "text": "Valid if approved by the bank's Board of Directors"
      }
    ],
    "correct": "C",
    "explanation": "Rule 3(b) requires the notice to give an itemised description of the personal data and the specified purpose or purposes, along with specific description of goods or services to be provided. \"Banking services\" is too vague and does not meet the itemised specificity requirement of Rule 3.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-7",
    "source": "sector",
    "text": "Under Rule 3(c), a bank's notice must include information through which the customer can:",
    "options": [
      {
        "key": "A",
        "text": "Apply for new banking products"
      },
      {
        "key": "B",
        "text": "Withdraw consent, exercise rights under the Act, and make a complaint to the Board"
      },
      {
        "key": "C",
        "text": "Check loan eligibility"
      },
      {
        "key": "D",
        "text": "Contact the bank's customer service for general queries"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3(c) specifically requires the notice to give the particular communication link and other means by which the Data Principal may: (i) withdraw consent, (ii) exercise rights under the Act, and (iii) make a complaint to the Board. This is a mandatory transparency requirement.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-8",
    "source": "sector",
    "text": "An insurer's chatbot collects customer medical information for a health policy quote. The chatbot does not provide any notice before collecting data. This violates:",
    "options": [
      {
        "key": "A",
        "text": "Only the Consent principle"
      },
      {
        "key": "B",
        "text": "Section 5 — the notice must accompany or precede any request for data"
      },
      {
        "key": "C",
        "text": "Only the Security principle"
      },
      {
        "key": "D",
        "text": "Section 10 — Significant Data Fiduciary obligations"
      }
    ],
    "correct": "B",
    "explanation": "Section 5(1) requires that every request for consent shall be accompanied or preceded by a notice. Collecting medical information through a chatbot without first providing a notice about what data is being collected and for what purpose directly violates Section 5(1) of DPDPA.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-9",
    "source": "sector",
    "text": "A bank updates its data processing practices to include sharing data with a new credit bureau. The existing customers were not informed of this change. Under DPDPA, the bank must:",
    "options": [
      {
        "key": "A",
        "text": "Update its privacy policy and assume customers have read it"
      },
      {
        "key": "B",
        "text": "Provide fresh notice to customers about the new processing activity and purpose"
      },
      {
        "key": "C",
        "text": "Only inform customers who specifically ask about data sharing"
      },
      {
        "key": "D",
        "text": "Inform RBI and let RBI notify customers"
      }
    ],
    "correct": "B",
    "explanation": "Adding a new processing activity (sharing with a new credit bureau) constitutes a new purpose beyond what was originally noticed. Under Section 5, the notice must be given before processing for any new purpose. Customers must be specifically informed of this new data sharing, not just through an updated privacy policy.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-10",
    "source": "sector",
    "text": "A mutual fund company collects investor data through a paper KYC form and later digitizes it. Under DPDPA, is this processing covered?",
    "options": [
      {
        "key": "A",
        "text": "No, DPDPA only applies to data collected digitally"
      },
      {
        "key": "B",
        "text": "Yes, DPDPA applies to personal data collected in non-digital form and digitised subsequently"
      },
      {
        "key": "C",
        "text": "No, KYC data is exempt from DPDPA"
      },
      {
        "key": "D",
        "text": "Yes, but only after the investor's written consent for digitization"
      }
    ],
    "correct": "B",
    "explanation": "Section 3(a)(ii) specifically states that the Act applies to processing of digital personal data within the territory of India where the personal data is collected in non-digital form and digitised subsequently. Paper KYC forms that are scanned and digitized therefore fall under DPDPA.\n\n---"
  },
  {
    "principleNo": 2,
    "id": "sector-p2-11",
    "source": "sector",
    "text": "A bank's notice for a credit card application says \"we may share your data with our partners.\" Under Rule 3, this notice is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as it discloses data sharing"
      },
      {
        "key": "B",
        "text": "Invalid as \"partners\" is vague — notice must specify the purposes and types of sharing clearly"
      },
      {
        "key": "C",
        "text": "Valid if the credit card agreement mentions specific partners"
      },
      {
        "key": "D",
        "text": "Valid if the bank has an IRDAI-approved data sharing policy"
      }
    ],
    "correct": "B",
    "explanation": "Rule 3(b) requires specific and clear language. \"We may share with our partners\" is vague and does not give the customer fair account of the details necessary to give specific and informed consent. The notice must clearly describe what data is shared, with whom, and for what specific purpose.\n\n---\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-2",
    "source": "sector",
    "text": "A bank account opening form has a pre-ticked checkbox saying \"I consent to receiving marketing communications.\" Under DPDPA, this consent is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as the customer can untick the box"
      },
      {
        "key": "B",
        "text": "Valid if it is clearly visible on the form"
      },
      {
        "key": "C",
        "text": "Invalid as it is not a clear affirmative action — consent must be unambiguous"
      },
      {
        "key": "D",
        "text": "Valid if the bank is regulated by RBI"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(1) requires consent to be \"unambiguous with a clear affirmative action.\" A pre-ticked checkbox is not a clear affirmative action — the customer has not actively chosen to consent to marketing. This form of consent does not meet the DPDPA standard regardless of whether the bank is regulated.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-3",
    "source": "sector",
    "text": "An insurance company asks a customer to sign a single consent form for: (i) processing data to issue the policy, and (ii) waiving her right to complain to the Data Protection Board. The consent for (ii) is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as it is a contractual agreement"
      },
      {
        "key": "B",
        "text": "Valid if IRDAI has approved the policy form"
      },
      {
        "key": "C",
        "text": "Invalid as waiving the right to complain to the Board infringes the Act"
      },
      {
        "key": "D",
        "text": "Valid if the customer is made aware of the waiver"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(2) states that any part of consent that constitutes an infringement of the provisions of the Act is invalid. The right to complain to the Board is a statutory right under Section 13(3). This right cannot be waived through a contractual consent clause, making such consent invalid to that extent.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-4",
    "source": "sector",
    "text": "A customer tells her bank that she wants to withdraw consent for the processing of her data for marketing purposes. The bank must:",
    "options": [
      {
        "key": "A",
        "text": "Process the withdrawal request within 6 months"
      },
      {
        "key": "B",
        "text": "Withdraw consent only after the customer completes a notarized declaration"
      },
      {
        "key": "C",
        "text": "Within a reasonable time, cease and cause its Data Processors to cease marketing-related processing"
      },
      {
        "key": "D",
        "text": "Continue marketing processing for the remainder of the contractual year"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(6) requires that upon withdrawal of consent, the Data Fiduciary shall within a reasonable time cease and cause its Data Processors to cease processing the personal data for that purpose. There is no provision for delay conditions like end of contractual year or notarized declaration.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-5",
    "source": "sector",
    "text": "An NBFC bundles consent for a loan with consent for marketing communications, stating both are mandatory to avail the loan. Under DPDPA, this consent for marketing is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as the customer chose to take the loan"
      },
      {
        "key": "B",
        "text": "Valid if NBFC is a licensed entity"
      },
      {
        "key": "C",
        "text": "Invalid as consent must be free and unconditional — bundling makes marketing consent coercive"
      },
      {
        "key": "D",
        "text": "Valid as long as the customer was informed of both requirements"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(1) requires consent to be \"free\" and \"unconditional.\" Conditioning the grant of a loan on consent for marketing makes the marketing consent coercive — it is not freely given. Such bundled consent violates the freeness and unconditionality requirements of valid consent.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-6",
    "source": "sector",
    "text": "A customer withdraws her consent from an insurance company for processing her health data. The insurance company has an active medical claim of the customer under process. Regarding the active claim, the company:",
    "options": [
      {
        "key": "A",
        "text": "Must immediately stop all processing including the claim"
      },
      {
        "key": "B",
        "text": "May continue processing for the active claim as withdrawal does not affect legality of prior processing and ongoing legal obligations"
      },
      {
        "key": "C",
        "text": "Must refund the premium and close the policy"
      },
      {
        "key": "D",
        "text": "Must seek fresh consent specifically for the active claim processing"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(5) states that withdrawal does not affect the legality of processing based on consent before its withdrawal. Additionally, processing an active claim may also be a legitimate use under Section 7 (legal obligation). The insurer may continue processing for the active claim while ceasing processing for other purposes.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-7",
    "source": "sector",
    "text": "Under Section 6(10), in a Board proceeding, a bank claims it had obtained customer consent for a data sharing practice. Who bears the burden of proving this?",
    "options": [
      {
        "key": "A",
        "text": "The customer (Data Principal)"
      },
      {
        "key": "B",
        "text": "The Data Protection Board"
      },
      {
        "key": "C",
        "text": "The bank (Data Fiduciary)"
      },
      {
        "key": "D",
        "text": "The RBI as the banking regulator"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(10) explicitly states that where consent is the basis of processing and a question arises in a proceeding, the Data Fiduciary shall be obliged to prove that notice was given and consent was given by the Data Principal. The bank must produce evidence of valid consent — the burden is on it, not the customer.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-8",
    "source": "sector",
    "text": "A customer wishes to manage, review and withdraw her consent given to multiple banks through a single platform. Under DPDPA, this can be done through:",
    "options": [
      {
        "key": "A",
        "text": "The Data Protection Board's online portal"
      },
      {
        "key": "B",
        "text": "A Consent Manager registered with the Board"
      },
      {
        "key": "C",
        "text": "The Ministry of Electronics and IT's DigiLocker platform"
      },
      {
        "key": "D",
        "text": "The RBI's Banking Ombudsman portal"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(7) and 6(8) allow a Data Principal to give, manage, review or withdraw consent through a Consent Manager. Section 6(9) requires Consent Managers to be registered with the Board. A Consent Manager provides a single interoperable platform for managing consent across multiple Data Fiduciaries.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-9",
    "source": "sector",
    "text": "A life insurance policy application requires a customer's medical history. The consent for collecting this data must be:",
    "options": [
      {
        "key": "A",
        "text": "General — covering all possible medical conditions"
      },
      {
        "key": "B",
        "text": "Specific — for the defined purpose of life insurance underwriting and risk assessment"
      },
      {
        "key": "C",
        "text": "Permanent and irrevocable once given for the policy period"
      },
      {
        "key": "D",
        "text": "Witnessed by a doctor for medical data"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(1) requires consent to be \"specific\" — for a defined, stated purpose. The consent for collecting medical history must be specifically for life insurance underwriting and risk assessment. General or open-ended consent for \"all insurance purposes\" would not meet the specificity requirement.\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-10",
    "source": "sector",
    "text": "A bank's mobile app requires customers to provide consent for ALL data collection as a single option, without the ability to give consent selectively for different types of processing. Under DPDPA, this is:",
    "options": [
      {
        "key": "A",
        "text": "Valid as it is simpler for the customer"
      },
      {
        "key": "B",
        "text": "Valid if the app's privacy settings can be changed later"
      },
      {
        "key": "C",
        "text": "Invalid as consent must be specific for each purpose, not a single blanket consent"
      },
      {
        "key": "D",
        "text": "Valid if approved by the bank's data governance committee"
      }
    ],
    "correct": "C",
    "explanation": "Section 6(1) requires consent to be \"specific\" — tied to a specified purpose. Bundling all types of data collection into a single all-or-nothing consent does not meet the specificity requirement. Customers must be able to give consent for specific purposes, not just a blanket \"accept all.\"\n\n---"
  },
  {
    "principleNo": 3,
    "id": "sector-p3-11",
    "source": "sector",
    "text": "An insurance agent verbally assures a customer that signing the consent form is \"just a formality\" and does not affect any rights. The customer signs under this impression. Is this valid consent?",
    "options": [
      {
        "key": "A",
        "text": "Valid as the customer voluntarily signed the document"
      },
      {
        "key": "B",
        "text": "Invalid as the consent is not \"informed\" — the customer was misled about its effect"
      },
      {
        "key": "C",
        "text": "Valid if witnessed by a third party"
      },
      {
        "key": "D",
        "text": "Valid as the agent acted in good faith"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(1) requires consent to be \"informed\" — the customer must understand what she is consenting to. If an agent misrepresents the nature of a consent form, the resulting consent is not informed. Consent obtained through misleading representations does not meet the \"informed\" requirement of Section 6(1).\n\n---\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-2",
    "source": "sector",
    "text": "A bank collects a customer's income and employment data for a personal loan. After the loan is disbursed, it uses this data to push-sell mutual fund products. This use is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as it is within the same bank"
      },
      {
        "key": "B",
        "text": "Lawful if disclosed in the bank's master consent form"
      },
      {
        "key": "C",
        "text": "Unlawful as it exceeds the specified purpose of loan processing"
      },
      {
        "key": "D",
        "text": "Lawful as financial products are all within the same sector"
      }
    ],
    "correct": "C",
    "explanation": "The specified purpose for collecting income and employment data was personal loan processing. Using it for cross-selling mutual funds is a completely different purpose. Section 6(1) and 8(7) require data to be used only for the specified purpose. Fresh consent is required for the cross-selling purpose.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-3",
    "source": "sector",
    "text": "An insurance company collects customer health data to process a mediclaim. It later uses the same data to deny renewal of a life insurance policy. This cross-use is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as both are insurance products"
      },
      {
        "key": "B",
        "text": "Lawful if IRDAI permits such use"
      },
      {
        "key": "C",
        "text": "Unlawful as health data collected for mediclaim processing cannot be used for life insurance underwriting without a new specified purpose and consent"
      },
      {
        "key": "D",
        "text": "Lawful as the insurer owns the data once collected"
      }
    ],
    "correct": "C",
    "explanation": "The specified purpose for collecting health data was mediclaim processing. Using it for life insurance underwriting decisions is a different purpose. Under Section 6(1) and 8(7), processing must be limited to the specified purpose. Cross-using data for a different product without fresh consent violates purpose limitation.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-4",
    "source": "sector",
    "text": "A bank's loan repayment data of a customer is shared with a credit bureau under the Credit Information Companies (Regulation) Act. This is:",
    "options": [
      {
        "key": "A",
        "text": "Unlawful as it shares data beyond the original loan purpose"
      },
      {
        "key": "B",
        "text": "Lawful as it is mandated by law — a legal obligation overrides purpose limitation"
      },
      {
        "key": "C",
        "text": "Unlawful without specific customer consent for credit bureau sharing"
      },
      {
        "key": "D",
        "text": "Lawful only for non-performing assets"
      }
    ],
    "correct": "B",
    "explanation": "Section 7(d) allows processing for fulfilling a legal obligation to disclose information to the State or its instrumentalities. Sharing credit data with regulated credit bureaus under the Credit Information Companies (Regulation) Act is a statutory obligation that overrides the strict purpose limitation principle.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-5",
    "source": "sector",
    "text": "A customer provides her email address to a bank for receiving account statements. The bank starts sending promotional offers from its insurance subsidiary to that email. This is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as it is for the bank's own group companies"
      },
      {
        "key": "B",
        "text": "Lawful if the bank's conglomerate has a unified data sharing policy"
      },
      {
        "key": "C",
        "text": "Unlawful as the email was collected for the purpose of account statements, not promotional communications"
      },
      {
        "key": "D",
        "text": "Lawful as email communication is a minor use of data"
      }
    ],
    "correct": "C",
    "explanation": "The customer's email was provided for the specific purpose of receiving account statements. Using it for promotional communications — even from group companies — is a different purpose. Section 6(1) and 8(7) prohibit using data beyond the specified purpose without fresh consent from the customer.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-6",
    "source": "sector",
    "text": "After a home loan is fully repaid, the bank continues retaining the customer's property and income documents for future cross-selling opportunities. Under DPDPA, this retention is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as the bank may offer the customer future products"
      },
      {
        "key": "B",
        "text": "Lawful if the documents are stored securely"
      },
      {
        "key": "C",
        "text": "Unlawful as the specified purpose (home loan processing) has been served and data must be erased"
      },
      {
        "key": "D",
        "text": "Lawful as long as the bank does not misuse the data"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(7) requires data to be erased as soon as the specified purpose is no longer being served. After the home loan is fully repaid, the loan processing purpose is served. Retaining documents for future cross-selling is not the original specified purpose, making further retention unlawful (subject to any applicable legal retention requirements).\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-7",
    "source": "sector",
    "text": "A health insurer uses policyholder data to conduct internal research on disease trends. The research improves actuarial models. Is this use lawful?",
    "options": [
      {
        "key": "A",
        "text": "Yes, as it is for business improvement"
      },
      {
        "key": "B",
        "text": "Only if the data is anonymized and research meets standards under Section 17(2)(b) and Second Schedule"
      },
      {
        "key": "C",
        "text": "Yes, as insurers are exempt from purpose limitation"
      },
      {
        "key": "D",
        "text": "No, research use of insurance data is always prohibited"
      }
    ],
    "correct": "B",
    "explanation": "Section 17(2)(b) exempts processing for research, archiving or statistical purposes if carried on in accordance with the standards specified in the Second Schedule of DPDP Rules 2025. The research must not be used to make decisions specific to any individual Data Principal and must meet the prescribed standards.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-8",
    "source": "sector",
    "text": "A payment bank collects UPI transaction data to process payments. It later sells anonymized transaction patterns to advertisers. The anonymized data sale is:",
    "options": [
      {
        "key": "A",
        "text": "Always lawful as anonymized data is not personal data"
      },
      {
        "key": "B",
        "text": "Potentially unlawful if the \"anonymized\" data can re-identify individuals — purpose limitation still applies"
      },
      {
        "key": "C",
        "text": "Lawful as selling data to advertisers is industry practice"
      },
      {
        "key": "D",
        "text": "Lawful if RBI approves such data monetization"
      }
    ],
    "correct": "B",
    "explanation": "Purpose limitation under DPDPA requires data to be used for the specified purpose of processing payments. Selling transaction patterns to advertisers is a completely different purpose requiring fresh consent. Additionally, if data claimed to be anonymized can still re-identify individuals, it remains personal data under Section 2(t) of DPDPA.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-9",
    "source": "sector",
    "text": "A non-banking financial company (NBFC) collects vehicle RC documents for a vehicle loan. After loan closure, RTO regulations require it to retain vehicle-related documents for 7 years. Under DPDPA:",
    "options": [
      {
        "key": "A",
        "text": "The NBFC must erase the documents immediately upon loan closure"
      },
      {
        "key": "B",
        "text": "The NBFC may retain the documents for 7 years as legal retention requirement overrides DPDPA erasure"
      },
      {
        "key": "C",
        "text": "The NBFC must seek fresh consent to retain the documents post loan closure"
      },
      {
        "key": "D",
        "text": "The NBFC must transfer the documents to the customer and then erase"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(7) contains an explicit exception — data need not be erased if \"retention is necessary for compliance with any law for the time being in force.\" If RTO regulations mandate 7-year retention, the NBFC may retain vehicle documents for that period without violating DPDPA's erasure obligation.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-10",
    "source": "sector",
    "text": "A bank provides credit card data to a fraud analytics company for detecting fraudulent transactions. After the fraud investigation is complete, the analytics company continues using this data to build commercial fraud prediction products. This continued use is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as fraud analytics is always in public interest"
      },
      {
        "key": "B",
        "text": "Unlawful as the specified purpose (fraud investigation) is served and commercial use requires fresh consent"
      },
      {
        "key": "C",
        "text": "Lawful if the analytics company anonymizes the data"
      },
      {
        "key": "D",
        "text": "Lawful if the bank approved the commercial use in the contract"
      }
    ],
    "correct": "B",
    "explanation": "The specified purpose for sharing the data was fraud detection for a specific investigation. Once the investigation is complete, the purpose is served. Using the data for building commercial products is a new and different purpose. Neither the bank's approval in the contract nor anonymization removes the DPDPA purpose limitation obligation.\n\n---"
  },
  {
    "principleNo": 4,
    "id": "sector-p4-11",
    "source": "sector",
    "text": "A bank uses a customer's dormant account data (no transactions for 2 years) to offer targeted banking products. Under DPDPA, this use:",
    "options": [
      {
        "key": "A",
        "text": "Is lawful as the customer is still a customer of the bank"
      },
      {
        "key": "B",
        "text": "Is lawful if the bank sends a notice with the marketing offer"
      },
      {
        "key": "C",
        "text": "May be unlawful if the specified purpose for dormant account data has been deemed no longer served under Section 8(8)"
      },
      {
        "key": "D",
        "text": "Is always lawful for account holders regardless of account activity"
      }
    ],
    "correct": "C",
    "explanation": "Section 8(8) provides that the purpose is deemed no longer served when the Data Principal has neither approached the Fiduciary for the specified purpose nor exercised any rights for the prescribed period. A dormant account may trigger the deemed expiry provision under Rule 8, after which further processing including marketing may be unlawful.\n\n---\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-2",
    "source": "sector",
    "text": "A bank's mobile loan app requires customers to mandatorily submit: (i) PAN card, (ii) Aadhaar, (iii) salary slips, (iv) full social media login credentials. Regarding (iv), this is:",
    "options": [
      {
        "key": "A",
        "text": "Acceptable as it helps assess creditworthiness"
      },
      {
        "key": "B",
        "text": "A violation of data minimization as social media credentials are not necessary for loan processing"
      },
      {
        "key": "C",
        "text": "Acceptable if the customer voluntarily provides them"
      },
      {
        "key": "D",
        "text": "Acceptable if the bank's credit risk policy requires it"
      }
    ],
    "correct": "B",
    "explanation": "Section 6(1) limits consent and collection to personal data \"necessary for such specified purpose.\" Social media login credentials are not necessary for loan processing — PAN, Aadhaar, and salary slips are standard requirements. Collecting unnecessary data violates the data minimization principle regardless of the bank's internal policy.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-3",
    "source": "sector",
    "text": "An insurance company collects a comprehensive health questionnaire for a term life insurance policy including: current health conditions, family medical history, smoking habits. Additionally, it also collects the customer's daily food habits and exercise routine. The food and exercise data collection is:",
    "options": [
      {
        "key": "A",
        "text": "Justified for accurate mortality risk assessment"
      },
      {
        "key": "B",
        "text": "A violation of data minimization as daily food and exercise habits are excessive for term life underwriting"
      },
      {
        "key": "C",
        "text": "Justified if the policy offers wellness discounts"
      },
      {
        "key": "D",
        "text": "Acceptable as health insurers are exempt from data minimization"
      }
    ],
    "correct": "B",
    "explanation": "While current health, family history, and smoking habits are standard and necessary for life insurance underwriting, daily food habits and exercise routines go beyond what is necessary for the specified purpose. Data minimization under Section 6(1) requires limiting collection to what is necessary — granular lifestyle data exceeds this threshold for basic term life insurance.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-4",
    "source": "sector",
    "text": "A payment gateway requires merchants to submit: (i) business registration documents, (ii) bank account details, (iii) PAN, and (iv) detailed personal financial statements of all family members of the owner. Regarding (iv):",
    "options": [
      {
        "key": "A",
        "text": "Justified for comprehensive credit risk assessment"
      },
      {
        "key": "B",
        "text": "A violation of data minimization — family members' financial statements are not necessary for merchant onboarding"
      },
      {
        "key": "C",
        "text": "Acceptable if the merchant's net worth is below a threshold"
      },
      {
        "key": "D",
        "text": "Acceptable as payment gateways are regulated by RBI"
      }
    ],
    "correct": "B",
    "explanation": "Business registration, bank details, and PAN are necessary for merchant onboarding and KYC. However, detailed financial statements of all family members are not necessary for this purpose. Data minimization under Section 6(1) requires that only data necessary for the specified purpose be collected — family member data goes well beyond this requirement.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-5",
    "source": "sector",
    "text": "A digital lending platform requires borrowers to grant access to their entire phone contact list to detect \"social risk patterns\" for credit scoring. This is:",
    "options": [
      {
        "key": "A",
        "text": "Lawful as alternative credit scoring is an evolving practice"
      },
      {
        "key": "B",
        "text": "A violation of data minimization — contacts are not necessary for creditworthiness assessment"
      },
      {
        "key": "C",
        "text": "Lawful if borrowers explicitly consent"
      },
      {
        "key": "D",
        "text": "Lawful if the RBI guidelines permit alternative credit data"
      }
    ],
    "correct": "B",
    "explanation": "Accessing an entire phone contact list is not necessary for credit scoring. Even if the borrower consents, Section 6(2) states that consent that constitutes an infringement of the Act is invalid. Section 6(1) limits consent to necessary data. The contact list collection violates data minimization, making even a consented collection invalid under DPDPA.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-6",
    "source": "sector",
    "text": "An insurance company's KYC process for a vehicle insurance policy requires: (i) driver's license, (ii) vehicle RC, (iii) address proof, and (iv) customer's full 10-year travel history. Regarding (iv):",
    "options": [
      {
        "key": "A",
        "text": "Justified for assessing driving behavior risk"
      },
      {
        "key": "B",
        "text": "Not necessary for vehicle insurance and violates data minimization"
      },
      {
        "key": "C",
        "text": "Acceptable if the customer has a history of claims"
      },
      {
        "key": "D",
        "text": "Justified for premium calculation"
      }
    ],
    "correct": "B",
    "explanation": "Driver's license, vehicle RC, and address proof are standard and necessary for vehicle insurance. A 10-year travel history is not necessary for vehicle insurance issuance or premium calculation. This excessive data collection violates the data minimization principle under Section 6(1) of DPDPA.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-7",
    "source": "sector",
    "text": "Under the Second Schedule of DPDP Rules 2025, when the State processes personal data for welfare scheme eligibility, the data collected must be:",
    "options": [
      {
        "key": "A",
        "text": "Comprehensive to avoid future re-collection"
      },
      {
        "key": "B",
        "text": "Limited to data necessary for the specific welfare scheme's uses or purposes"
      },
      {
        "key": "C",
        "text": "Approved by the Data Protection Board"
      },
      {
        "key": "D",
        "text": "Stored on government servers regardless of volume"
      }
    ],
    "correct": "B",
    "explanation": "The Second Schedule specifically states that \"processing is limited to such personal data as is necessary for such uses or achieving such purposes.\" For a welfare scheme, only data directly relevant to determining eligibility and administering the scheme should be collected. Collecting excess data even for a government welfare scheme violates data minimization.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-8",
    "source": "sector",
    "text": "A bank's credit card application collects: name, income, employment details, credit history, and also the customer's religion and political affiliations. The last two data points are:",
    "options": [
      {
        "key": "A",
        "text": "Justified for comprehensive risk assessment"
      },
      {
        "key": "B",
        "text": "A violation of data minimization — religion and political affiliation are irrelevant to creditworthiness"
      },
      {
        "key": "C",
        "text": "Acceptable if the bank discloses collection in its privacy policy"
      },
      {
        "key": "D",
        "text": "Acceptable for demographic analytics with anonymization"
      }
    ],
    "correct": "B",
    "explanation": "Name, income, employment details and credit history are necessary for credit card issuance. Religion and political affiliation have no relevance to creditworthiness assessment. Collecting them violates the data minimization principle under Section 6(1). Such collection could also raise discrimination concerns under other laws.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-9",
    "source": "sector",
    "text": "A crop insurance scheme under PMFBY (Pradhan Mantri Fasal Bima Yojana) collects farmer's land records, crop details, and bank account for claim payment. It also collects detailed personal correspondence history. The correspondence data collection is:",
    "options": [
      {
        "key": "A",
        "text": "Justified for fraud detection in insurance claims"
      },
      {
        "key": "B",
        "text": "Not necessary for crop insurance and violates data minimization standards in the Second Schedule"
      },
      {
        "key": "C",
        "text": "Acceptable as government schemes have broader data collection powers"
      },
      {
        "key": "D",
        "text": "Acceptable if the State government approves the collection"
      }
    ],
    "correct": "B",
    "explanation": "Land records, crop details, and bank accounts are directly necessary for crop insurance eligibility and claim payment. Personal correspondence history is not necessary for this purpose. The Second Schedule standards (applicable to State processing) require data to be limited to what is necessary for the specific use — correspondence data exceeds this threshold.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-10",
    "source": "sector",
    "text": "A fintech lender's app collects read access to a borrower's SMS messages to detect salary credits. The app collects ALL SMS messages including personal, medical and relationship messages. This is:",
    "options": [
      {
        "key": "A",
        "text": "Acceptable as the lender needs to verify income"
      },
      {
        "key": "B",
        "text": "A violation of data minimization — only salary-related SMS access is necessary, not all personal messages"
      },
      {
        "key": "C",
        "text": "Acceptable if the borrower grants permission in the app settings"
      },
      {
        "key": "D",
        "text": "Acceptable as the data is automatically processed without human reading"
      }
    ],
    "correct": "B",
    "explanation": "Even if SMS reading for salary credit detection has a legitimate purpose, collecting ALL SMS messages (including personal, medical and relationship messages) goes far beyond what is necessary for income verification. Data minimization requires limiting collection to the minimum necessary — a targeted approach to salary credit detection would be compliant; blanket SMS access is not.\n\n---"
  },
  {
    "principleNo": 5,
    "id": "sector-p5-11",
    "source": "sector",
    "text": "A bank's net banking registration requires customers to mandatorily fill 47 fields including great-grandparents' names. The name of great-grandparents field is:",
    "options": [
      {
        "key": "A",
        "text": "Acceptable for heritage and lineage verification"
      },
      {
        "key": "B",
        "text": "A violation of data minimization as ancestral names are not necessary for net banking registration"
      },
      {
        "key": "C",
        "text": "Acceptable if the bank's security policy requires multi-generational identity verification"
      },
      {
        "key": "D",
        "text": "Acceptable if the field is optional"
      }
    ],
    "correct": "B",
    "explanation": "Net banking registration requires identity verification details such as name, date of birth, account number, contact details and similar relevant information. Great-grandparents' names have no relevance to net banking registration or security. This is excessive data collection that violates the data minimization principle under Section 6(1). Note: If the field is truly optional, the impact is reduced, but the bank should not design forms encouraging collection of unnecessary data.\n\n---\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-2",
    "source": "sector",
    "text": "A bank shares a customer's credit report with a mortgage lender. The credit report contains a loan default entry that was already settled. The bank must ensure:",
    "options": [
      {
        "key": "A",
        "text": "The mortgage lender uses the data at its own risk"
      },
      {
        "key": "B",
        "text": "The credit report is accurate, complete and consistent before sharing under Section 8(3)"
      },
      {
        "key": "C",
        "text": "The customer authorizes the sharing in writing"
      },
      {
        "key": "D",
        "text": "The settled default is disclosed separately by the customer"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(3) requires that where personal data is disclosed to another Data Fiduciary, the sharing Data Fiduciary must ensure its completeness, accuracy and consistency. The bank sharing a credit report with an inaccurate default entry violates this accuracy obligation. The settled default must be updated before the report is shared.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-3",
    "source": "sector",
    "text": "A customer discovers her date of birth is wrong in the bank's records, causing incorrect age-based insurance premium calculations. Under Section 12, the customer has the right to:",
    "options": [
      {
        "key": "A",
        "text": "Only file a complaint with IRDAI"
      },
      {
        "key": "B",
        "text": "Request correction of the inaccurate date of birth from the bank"
      },
      {
        "key": "C",
        "text": "Sue the bank in civil court for damages"
      },
      {
        "key": "D",
        "text": "Request the Data Protection Board to correct the data directly"
      }
    ],
    "correct": "B",
    "explanation": "Section 12(1) and 12(2) give the Data Principal the right to correction of inaccurate or misleading personal data. The customer may request the bank to correct the date of birth. The bank must correct inaccurate data upon receiving such a request. Only after exhausting this grievance redressal can the customer approach the Board.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-4",
    "source": "sector",
    "text": "An insurance company uses outdated hospitalization records to deny a health claim, claiming pre-existing conditions. The customer has updated medical records showing recovery. Under DPDPA, the insurance company has violated:",
    "options": [
      {
        "key": "A",
        "text": "Section 7 — legitimate use"
      },
      {
        "key": "B",
        "text": "Section 8(3) — obligation to ensure accuracy when using data to make decisions affecting the Data Principal"
      },
      {
        "key": "C",
        "text": "Section 9 — children's data protection"
      },
      {
        "key": "D",
        "text": "Section 15 — duties of Data Principal"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(3) requires that where personal data is used to make a decision affecting the Data Principal, the Data Fiduciary must ensure completeness, accuracy and consistency. Using outdated medical records to deny a claim — a decision that directly affects the customer — without considering updated records violates the accuracy obligation.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-5",
    "source": "sector",
    "text": "A customer requests her bank to update her address after relocation. The bank updates the core banking system but fails to update the loan servicing system. A loan notice is then sent to the old address. The bank has violated:",
    "options": [
      {
        "key": "A",
        "text": "Only the Notice principle"
      },
      {
        "key": "B",
        "text": "Section 8(3) — accuracy obligation as inconsistency in data across systems affected the customer"
      },
      {
        "key": "C",
        "text": "Section 6 — consent requirements"
      },
      {
        "key": "D",
        "text": "No provision as this is an operational issue, not a DPDPA violation"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(3) requires ensuring completeness, accuracy AND consistency of personal data. Having inconsistent address data across systems (core banking vs. loan servicing) violates the consistency component of the accuracy obligation. The failure to maintain consistent data across systems directly affected the Data Principal (loan notice to wrong address).\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-6",
    "source": "sector",
    "text": "A credit bureau has an error in X's CIBIL score due to a data entry mistake by a bank. X applies for a home loan and gets rejected due to this error. Under DPDPA, X may:",
    "options": [
      {
        "key": "A",
        "text": "Only approach IRDAI"
      },
      {
        "key": "B",
        "text": "Request correction from both the bank and the credit bureau under Section 12 and file a grievance"
      },
      {
        "key": "C",
        "text": "Only approach the banking ombudsman"
      },
      {
        "key": "D",
        "text": "File a criminal complaint against the bank"
      }
    ],
    "correct": "B",
    "explanation": "Section 12 gives X the right to correction of inaccurate personal data. X should first request correction from both the bank (originator of the error) and the credit bureau (holder of the data). Under Section 13, she must exhaust the grievance redressal mechanism before approaching the Data Protection Board.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-7",
    "source": "sector",
    "text": "Under Section 12(3), a bank may refuse to erase a customer's loan repayment history even upon request because:",
    "options": [
      {
        "key": "A",
        "text": "Loan data is the bank's proprietary information"
      },
      {
        "key": "B",
        "text": "Retention is necessary for the specified purpose and legal compliance with RBI's data retention requirements"
      },
      {
        "key": "C",
        "text": "The customer agreed to data retention in the loan agreement"
      },
      {
        "key": "D",
        "text": "Erasure is only available to customers who fully repay loans"
      }
    ],
    "correct": "B",
    "explanation": "Section 12(3) allows the Data Fiduciary to refuse erasure if retention is necessary for the specified purpose or for compliance with any law for the time being in force. RBI regulations mandate specific retention periods for loan records. The bank may legitimately refuse erasure of repayment history citing these legal requirements.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-8",
    "source": "sector",
    "text": "An insurance company receives a correction request from a policyholder to update her nominee's details. The company acknowledges but takes no action for 8 months. Under Rule 14(3) of DPDP Rules 2025, the company has violated:",
    "options": [
      {
        "key": "A",
        "text": "The security principle"
      },
      {
        "key": "B",
        "text": "The grievance redressal obligation — which requires resolution within a reasonable period not exceeding 90 days"
      },
      {
        "key": "C",
        "text": "The notice principle"
      },
      {
        "key": "D",
        "text": "No principle as nominee updates are not covered by DPDPA"
      }
    ],
    "correct": "B",
    "explanation": "Rule 14(3) requires every Data Fiduciary to respond to grievances within a reasonable period not exceeding ninety days under its grievance redressal system. A correction request is a Data Principal right under Section 12. Failing to act for 8 months (240+ days) far exceeds the 90-day limit, violating the grievance redressal obligation.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-9",
    "source": "sector",
    "text": "A bank uses an automated loan approval system that rejects X's loan application based on inaccurate data. X is unaware of what data was used. Under DPDPA, X has the right to:",
    "options": [
      {
        "key": "A",
        "text": "Only appeal to the bank's internal grievance committee"
      },
      {
        "key": "B",
        "text": "Request from the bank under Section 11 a summary of personal data processed and then request correction of inaccurate data under Section 12"
      },
      {
        "key": "C",
        "text": "File a case in the High Court against the automated system"
      },
      {
        "key": "D",
        "text": "Request the RBI to override the bank's decision"
      }
    ],
    "correct": "B",
    "explanation": "Section 11 gives X the right to obtain a summary of personal data being processed and the processing activities. Once she identifies the inaccurate data, Section 12 gives her the right to request correction. This two-step process — first access, then correction — is the proper DPDPA mechanism for addressing automated decision errors.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-10",
    "source": "sector",
    "text": "A health insurer's records show a customer as a smoker based on a 10-year-old medical report. The customer has since quit. This affects her premium. The customer may:",
    "options": [
      {
        "key": "A",
        "text": "Do nothing as historical medical data is final"
      },
      {
        "key": "B",
        "text": "Request completion/updating of her medical data to reflect current non-smoker status under Section 12"
      },
      {
        "key": "C",
        "text": "Only approach IRDAI's Grievance Redressal System"
      },
      {
        "key": "D",
        "text": "Only pay the higher premium as it is based on disclosed information"
      }
    ],
    "correct": "B",
    "explanation": "Section 12(1) gives the right to correction, completion, updating and erasure of personal data. The customer may request the insurer to update her medical status to reflect current non-smoker status. Section 12(2)(c) specifically covers the right to have personal data updated. The insurer must then update the records and potentially recalculate the premium.\n\n---"
  },
  {
    "principleNo": 6,
    "id": "sector-p6-11",
    "source": "sector",
    "text": "A bank's loan system incorrectly marks X's loan as \"outstanding\" despite full repayment. The bank shares this inaccurate data with a credit bureau, resulting in X being denied a credit card by another bank. Under DPDPA, the first bank has violated:",
    "options": [
      {
        "key": "A",
        "text": "Only the Security principle"
      },
      {
        "key": "B",
        "text": "Section 8(3) — accuracy and consistency obligation before disclosure to another Data Fiduciary"
      },
      {
        "key": "C",
        "text": "Section 9 — special category data protection"
      },
      {
        "key": "D",
        "text": "No provision as credit bureau sharing is a regulated activity"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(3) specifically requires that where personal data is disclosed to another Data Fiduciary (the credit bureau), the Data Fiduciary must ensure its completeness, accuracy and consistency. Sharing inaccurate loan status data with a credit bureau, which then leads to credit card denial, is a clear violation of the accuracy obligation under Section 8(3).\n\n---\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-2",
    "source": "sector",
    "text": "A customer closes her savings account with a bank. RBI regulations require the bank to maintain account records for 10 years post closure. Under DPDPA, the bank:",
    "options": [
      {
        "key": "A",
        "text": "Must immediately erase all customer data upon account closure"
      },
      {
        "key": "B",
        "text": "May retain data for 10 years as legal retention requirements override DPDPA's erasure obligation"
      },
      {
        "key": "C",
        "text": "Must seek fresh consent to retain data post account closure"
      },
      {
        "key": "D",
        "text": "Must transfer data to the Data Protection Board for safekeeping"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(7) contains the exception that data need not be erased where \"retention is necessary for compliance with any law for the time being in force.\" RBI regulations mandating 10-year retention of banking records constitute such a legal requirement, which overrides DPDPA's general erasure obligation upon account closure.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-3",
    "source": "sector",
    "text": "Under Rule 8(3) of DPDP Rules 2025, what is the minimum period for which a bank must retain personal data and processing logs from a transaction date?",
    "options": [
      {
        "key": "A",
        "text": "6 months"
      },
      {
        "key": "B",
        "text": "1 year"
      },
      {
        "key": "C",
        "text": "3 years"
      },
      {
        "key": "D",
        "text": "5 years"
      }
    ],
    "correct": "B",
    "explanation": "Rule 8(3) requires that without prejudice to other erasure obligations, a Data Fiduciary shall retain personal data, associated traffic data and other logs of processing for a minimum period of one year from the date of processing. This minimum applies even if the customer closes her account or deletes her profile.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-4",
    "source": "sector",
    "text": "An insurance company retains policyholder data for 15 years after policy maturity, citing \"business analytics needs.\" IRDAI regulations require only 7 years retention. Under DPDPA, retaining data beyond 7 years for analytics:",
    "options": [
      {
        "key": "A",
        "text": "Is lawful as longer retention is always safer"
      },
      {
        "key": "B",
        "text": "Violates storage limitation — retention must align with legal requirements, not business convenience"
      },
      {
        "key": "C",
        "text": "Is lawful if data is anonymized after 7 years"
      },
      {
        "key": "D",
        "text": "Is lawful if the policyholder did not request deletion"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(7) requires erasure unless retention is necessary for compliance with any law. IRDAI's 7-year requirement sets the legal maximum. Retaining data for 15 years for \"business analytics\" goes beyond legal necessity. Once the 7-year period under IRDAI regulations ends, further retention for analytics violates storage limitation under DPDPA.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-5",
    "source": "sector",
    "text": "A bank sends a customer a notification that her dormant account data will be erased in 48 hours unless she logs in or contacts the bank. This notification is:",
    "options": [
      {
        "key": "A",
        "text": "An unnecessary procedural step"
      },
      {
        "key": "B",
        "text": "Mandatory under Rule 8(2) — Data Fiduciary must inform Data Principal at least 48 hours before erasure"
      },
      {
        "key": "C",
        "text": "Only required for Significant Data Fiduciaries"
      },
      {
        "key": "D",
        "text": "Required only for accounts dormant for more than 5 years"
      }
    ],
    "correct": "B",
    "explanation": "Rule 8(2) specifically requires that at least forty-eight hours before completion of the time period for erasure, the Data Fiduciary shall inform the Data Principal that such personal data shall be erased upon completion of such period unless she logs in or contacts the Fiduciary. This is a mandatory pre-erasure notification requirement.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-6",
    "source": "sector",
    "text": "A fintech lender has processed a short-term loan for a customer. The loan was repaid within 3 months. Under Rule 8, how long must the lender retain the loan transaction data and logs?",
    "options": [
      {
        "key": "A",
        "text": "Erase immediately after repayment"
      },
      {
        "key": "B",
        "text": "Retain for minimum 1 year from the date of processing, subject to applicable legal requirements"
      },
      {
        "key": "C",
        "text": "Retain for 3 years as the lender has 50 lakh+ users"
      },
      {
        "key": "D",
        "text": "Retain until the customer requests deletion"
      }
    ],
    "correct": "B",
    "explanation": "Rule 8(3) requires all Data Fiduciaries to retain personal data and processing logs for a minimum of one year from the date of processing. This applies regardless of loan duration. However, the lender must also comply with any RBI or other regulatory requirements that may mandate longer retention periods for loan records.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-7",
    "source": "sector",
    "text": "A general insurance company retains customer data from a motor insurance policy that lapsed 5 years ago. The customer has not contacted the company or exercised any rights in this period. Under the Third Schedule of DPDP Rules 2025, if the insurer is a social media intermediary with 2 crore+ users:",
    "options": [
      {
        "key": "A",
        "text": "It may retain data indefinitely as insurance data has no time limit"
      },
      {
        "key": "B",
        "text": "The purpose is deemed served and data must be erased as the 3-year period has passed"
      },
      {
        "key": "C",
        "text": "It may retain data for 7 more years"
      },
      {
        "key": "D",
        "text": "The Third Schedule does not apply to insurance companies"
      }
    ],
    "correct": "B",
    "explanation": "The Third Schedule specifies a 3-year period from the last contact by the Data Principal. If the customer has not approached the insurer or exercised rights for 5 years (exceeding the 3-year limit), the purpose is deemed no longer served under Section 8(8) and the data must be erased. Note: The Third Schedule specifically applies to e-commerce entities, online gaming, and social media intermediaries — insurance companies would follow the general Section 8(7) provisions.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-8",
    "source": "sector",
    "text": "A bank's cloud service provider (Data Processor) deletes customer data after 6 months post account closure without the bank's instruction. Under DPDPA, who is responsible?",
    "options": [
      {
        "key": "A",
        "text": "Only the cloud service provider (Data Processor)"
      },
      {
        "key": "B",
        "text": "The bank (Data Fiduciary) is responsible for ensuring the Data Processor complies with retention requirements"
      },
      {
        "key": "C",
        "text": "The customer for not monitoring her data"
      },
      {
        "key": "D",
        "text": "The Data Protection Board for not setting clear standards"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(1) makes the Data Fiduciary responsible for all processing by its Data Processors. Section 8(7)(b) requires the Data Fiduciary to cause its Data Processor to erase data — but only when appropriate. The bank must ensure its contract with the cloud provider specifies proper retention requirements. The bank cannot shift its accountability to the Data Processor.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-9",
    "source": "sector",
    "text": "A mutual fund company retains KYC data of investors even after they redeem all their investments and close their folios. SEBI regulations require 5-year post-redemption retention. Under DPDPA:",
    "options": [
      {
        "key": "A",
        "text": "The company must erase data immediately upon folio closure"
      },
      {
        "key": "B",
        "text": "The company may retain data for 5 years as required by SEBI regulations"
      },
      {
        "key": "C",
        "text": "The company must seek fresh consent to retain data post folio closure"
      },
      {
        "key": "D",
        "text": "The company may retain data indefinitely for investor onboarding purposes"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(7) permits retention where \"necessary for compliance with any law for the time being in force.\" SEBI's 5-year post-redemption KYC retention requirement is such a legal requirement. The mutual fund company is lawfully required to retain this data for 5 years and may do so without violating DPDPA's storage limitation principle.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-10",
    "source": "sector",
    "text": "Under Rule 8(2), a Data Fiduciary sends a 48-hour erasure notice to a bank customer. The customer logs into her account within 24 hours. What happens?",
    "options": [
      {
        "key": "A",
        "text": "Data is still erased as the erasure process has begun"
      },
      {
        "key": "B",
        "text": "The erasure is paused and data is retained as the customer has re-engaged with the specified purpose"
      },
      {
        "key": "C",
        "text": "The customer must call the bank to confirm she wants to retain her data"
      },
      {
        "key": "D",
        "text": "The Data Fiduciary must seek fresh consent before retaining the data"
      }
    ],
    "correct": "B",
    "explanation": "Rule 8(2) specifically states that data shall be erased \"unless she logs into her user account or otherwise initiates contact with the Data Fiduciary for the performance of the specified purpose or exercises her rights.\" A customer logging in within the 48-hour window constitutes re-engagement, pausing the erasure obligation and resetting the retention clock.\n\n---"
  },
  {
    "principleNo": 7,
    "id": "sector-p7-11",
    "source": "sector",
    "text": "An insurance company retains virtual insurance tokens (digital policy certificates stored on its platform, usable for claim filing) even after the policy expires. Under the Third Schedule exception:",
    "options": [
      {
        "key": "A",
        "text": "Virtual tokens must always be erased with other data"
      },
      {
        "key": "B",
        "text": "Virtual tokens that can be used to access services are excluded from time-based erasure obligations"
      },
      {
        "key": "C",
        "text": "Virtual tokens are only retained for Significant Data Fiduciaries"
      },
      {
        "key": "D",
        "text": "Virtual tokens require Board approval for extended retention"
      }
    ],
    "correct": "B",
    "explanation": "The Third Schedule specifically excludes from the time-based erasure obligation any virtual token that is issued by or on behalf of the Data Fiduciary, stored on its digital platform, and may be used to get money, goods or services. Digital policy certificates/tokens used for claim filing may qualify for this exception, as they enable access to services.\n\n---\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-2",
    "source": "sector",
    "text": "A bank's data breach exposes 10 lakh customers' account and transaction data. Under Rule 7(2), the bank must notify the Data Protection Board with detailed breach information within:",
    "options": [
      {
        "key": "A",
        "text": "24 hours"
      },
      {
        "key": "B",
        "text": "48 hours"
      },
      {
        "key": "C",
        "text": "72 hours"
      },
      {
        "key": "D",
        "text": "7 days"
      }
    ],
    "correct": "C",
    "explanation": "Rule 7(2)(b) requires the Data Fiduciary to intimate the Board within seventy-two hours of becoming aware of the breach with detailed information including updated breach details, broad facts and circumstances, mitigation measures, findings about the perpetrator, remedial measures, and a report on Data Principal notifications.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-3",
    "source": "sector",
    "text": "An insurance company's policy management system is hacked. The company discovers the breach on a Monday. The immediate initial notification to the Data Protection Board must be made:",
    "options": [
      {
        "key": "A",
        "text": "By the following Friday"
      },
      {
        "key": "B",
        "text": "Within 72 hours — by Thursday"
      },
      {
        "key": "C",
        "text": "Without delay — on Monday itself with initial breach description"
      },
      {
        "key": "D",
        "text": "After completing the full internal investigation"
      }
    ],
    "correct": "C",
    "explanation": "Rule 7(2)(a) requires that without delay, the Data Fiduciary must notify the Board a description of the breach including its nature, extent, timing and location of occurrence and likely impact. This initial notification must be immediate (Monday in this case). The detailed information follows within 72 hours under Rule 7(2)(b).\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-4",
    "source": "sector",
    "text": "A bank stores customer net banking passwords in plain text in its database. This is a violation of:",
    "options": [
      {
        "key": "A",
        "text": "Only the consent principle"
      },
      {
        "key": "B",
        "text": "Rule 6(1)(a) — the obligation to secure personal data through encryption, obfuscation or masking"
      },
      {
        "key": "C",
        "text": "Only the accountability principle"
      },
      {
        "key": "D",
        "text": "Section 9 — children's data protection"
      }
    ],
    "correct": "B",
    "explanation": "Rule 6(1)(a) specifically requires appropriate data security measures such as securing personal data through encryption, obfuscation, masking or virtual tokens. Storing passwords in plain text directly violates this minimum security safeguard requirement. Passwords must be hashed/encrypted at minimum.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-5",
    "source": "sector",
    "text": "A bank's contract with its cloud data processor does not include any data security provisions. Under Rule 6(1)(f), this is:",
    "options": [
      {
        "key": "A",
        "text": "Acceptable if the cloud provider has ISO 27001 certification"
      },
      {
        "key": "B",
        "text": "A violation — contracts with Data Processors must include appropriate provisions for reasonable security safeguards"
      },
      {
        "key": "C",
        "text": "Acceptable if the bank's own security is adequate"
      },
      {
        "key": "D",
        "text": "Acceptable for contracts below ₹1 crore in value"
      }
    ],
    "correct": "B",
    "explanation": "Rule 6(1)(f) requires appropriate provision in the contract between the Data Fiduciary and Data Processor, wherever applicable, for taking reasonable security safeguards. A contract that is silent on security obligations violates this requirement. The bank cannot rely on the processor's own certifications as a substitute for contractual security requirements.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-6",
    "source": "sector",
    "text": "An insurance company's branch office loses physical files containing customer health records. Under DPDPA Section 2(u), this constitutes:",
    "options": [
      {
        "key": "A",
        "text": "Not a DPDPA issue as DPDPA only covers digital data"
      },
      {
        "key": "B",
        "text": "A personal data breach if the files were digitized — loss of access to digitized personal data falls under Section 2(u)"
      },
      {
        "key": "C",
        "text": "Only a physical security issue, not a data protection concern"
      },
      {
        "key": "D",
        "text": "A breach only if the files are later found with a third party"
      }
    ],
    "correct": "B",
    "explanation": "Section 2(u) defines personal data breach to include \"loss of access to personal data that compromises the confidentiality, integrity or availability.\" If health records were digitized (making them digital personal data under Section 3(a)(ii)), loss of those digital records or their physical counterparts that were to be digitized constitutes a personal data breach requiring notification.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-7",
    "source": "sector",
    "text": "A fintech company uses an outsourced call center for customer service. A call center employee misuses customer financial data for fraud. The fintech company's DPDPA liability is:",
    "options": [
      {
        "key": "A",
        "text": "Nil as the misconduct was by the outsourced employee"
      },
      {
        "key": "B",
        "text": "Full — the fintech (Data Fiduciary) is responsible for all processing by its Data Processors including security breaches"
      },
      {
        "key": "C",
        "text": "Shared equally between the fintech and the call center"
      },
      {
        "key": "D",
        "text": "Limited to the amount of financial loss to the customer"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(1) makes the Data Fiduciary responsible for DPDPA compliance for all processing undertaken by it or on its behalf by a Data Processor. The fintech company is fully accountable. Additionally, Rule 6(1)(f) requires security provisions in Data Processor contracts. The fintech's failure to ensure proper security controls with the call center makes it fully liable.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-8",
    "source": "sector",
    "text": "A bank's access control system allows any bank employee to view any customer's account details without role-based access restrictions. Under Rule 6(1)(b), this violates:",
    "options": [
      {
        "key": "A",
        "text": "Only the consent principle"
      },
      {
        "key": "B",
        "text": "The obligation to implement appropriate measures to control access to computer resources"
      },
      {
        "key": "C",
        "text": "Only Section 9 — children's data protection"
      },
      {
        "key": "D",
        "text": "No principle as all employees are authorized bank staff"
      }
    ],
    "correct": "B",
    "explanation": "Rule 6(1)(b) requires appropriate measures to control access to the computer resources used by the Data Fiduciary or Data Processor. Role-based access control (RBAC) is a fundamental access control measure. Allowing any employee to access any customer's data without role restrictions violates this minimum security safeguard.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-9",
    "source": "sector",
    "text": "An insurance company suffers a breach but waits 2 weeks to notify affected policyholders, citing \"ongoing investigation.\" Under Rule 7(1), this delay is:",
    "options": [
      {
        "key": "A",
        "text": "Acceptable as investigation is necessary before notification"
      },
      {
        "key": "B",
        "text": "A violation — notification to affected Data Principals must be made without delay"
      },
      {
        "key": "C",
        "text": "Acceptable if the breach affected fewer than 1,000 customers"
      },
      {
        "key": "D",
        "text": "Acceptable if the IRDAI is notified within 2 weeks"
      }
    ],
    "correct": "B",
    "explanation": "Rule 7(1) requires the Data Fiduciary to intimate each affected Data Principal \"without delay.\" There is no provision allowing delay pending investigation. The notification to Data Principals must happen simultaneously with or immediately after the Board notification — ongoing investigation does not justify delay in notifying affected individuals.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-10",
    "source": "sector",
    "text": "A bank's security logs show multiple unauthorized access attempts to a customer's net banking account. The bank does not investigate or take any action. Under Rule 6(1)(c), the bank has violated:",
    "options": [
      {
        "key": "A",
        "text": "Only the notice principle"
      },
      {
        "key": "B",
        "text": "The obligation to maintain logs, monitoring and review for detection of unauthorized access, investigation and remediation"
      },
      {
        "key": "C",
        "text": "The storage limitation principle"
      },
      {
        "key": "D",
        "text": "No principle as unauthorized attempts did not result in a breach"
      }
    ],
    "correct": "B",
    "explanation": "Rule 6(1)(c) requires visibility on accessing of personal data through appropriate logs, monitoring and review for enabling detection of unauthorized access, its investigation and remediation to prevent recurrence. The bank having logs but not investigating or remediating unauthorized access attempts directly violates this active monitoring and review obligation.\n\n---"
  },
  {
    "principleNo": 8,
    "id": "sector-p8-11",
    "source": "sector",
    "text": "What is the maximum penalty a bank can face under DPDPA for failing to implement reasonable security safeguards that result in a personal data breach?",
    "options": [
      {
        "key": "A",
        "text": "₹50 crore"
      },
      {
        "key": "B",
        "text": "₹100 crore"
      },
      {
        "key": "C",
        "text": "₹200 crore"
      },
      {
        "key": "D",
        "text": "₹250 crore"
      }
    ],
    "correct": "D",
    "explanation": "The Schedule to the DPDPA specifies that breach in observing the obligation of Data Fiduciary to take reasonable security safeguards to prevent personal data breach under sub-section (5) of Section 8 may extend to ₹250 crore. This is the highest penalty in the Schedule — reflecting the seriousness of security obligations.\n\n---\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-2",
    "source": "sector",
    "text": "A bank outsources its credit card processing to a third-party vendor who suffers a data breach exposing customer data. Under Section 8(1), DPDPA accountability rests with:",
    "options": [
      {
        "key": "A",
        "text": "Only the third-party vendor"
      },
      {
        "key": "B",
        "text": "The bank (Data Fiduciary) — it is responsible for all processing by its Data Processors"
      },
      {
        "key": "C",
        "text": "Equally between the bank and the vendor"
      },
      {
        "key": "D",
        "text": "The Data Protection Board, which must investigate the vendor"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(1) states that a Data Fiduciary shall be responsible for DPDPA compliance for any processing undertaken by it or on its behalf by a Data Processor, irrespective of any agreement to the contrary. The bank cannot escape accountability by pointing to the vendor's breach. The bank's failure to ensure vendor security compliance is itself a violation.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-3",
    "source": "sector",
    "text": "A large private insurance company is notified as a Significant Data Fiduciary. Under Rule 13(1), it must conduct a Data Protection Impact Assessment:",
    "options": [
      {
        "key": "A",
        "text": "Once every 2 years"
      },
      {
        "key": "B",
        "text": "Only when directed by the Data Protection Board"
      },
      {
        "key": "C",
        "text": "Once every 12 months from the date of notification"
      },
      {
        "key": "D",
        "text": "Once at the time of notification and then as needed"
      }
    ],
    "correct": "C",
    "explanation": "Rule 13(1) requires a Significant Data Fiduciary to, once in every period of twelve months from the date on which it is notified as such, undertake a Data Protection Impact Assessment and an audit to ensure effective observance of the Act and rules. This is a mandatory annual requirement, not discretionary.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-4",
    "source": "sector",
    "text": "A Significant Data Fiduciary bank uses an AI algorithm for loan approvals. Under Rule 13(3), the bank must:",
    "options": [
      {
        "key": "A",
        "text": "Get the algorithm approved by the RBI"
      },
      {
        "key": "B",
        "text": "Register the algorithm with the Data Protection Board"
      },
      {
        "key": "C",
        "text": "Observe due diligence to verify the algorithm does not pose a risk to the rights of Data Principals"
      },
      {
        "key": "D",
        "text": "Disclose the algorithm publicly for transparency"
      }
    ],
    "correct": "C",
    "explanation": "Rule 13(3) requires a Significant Data Fiduciary to observe due diligence to verify that technical measures including algorithmic software adopted by it for hosting, display, uploading, modification, publishing, transmission, storage, updating or sharing of personal data are not likely to pose a risk to the rights of Data Principals. AI loan approval algorithms that could discriminate or violate rights must be assessed.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-5",
    "source": "sector",
    "text": "An insurance company (Significant Data Fiduciary) appoints a Data Protection Officer (DPO). Under Section 10(2)(a), the DPO must be:",
    "options": [
      {
        "key": "A",
        "text": "A government nominee with 15 years of experience"
      },
      {
        "key": "B",
        "text": "Based in India and responsible to the Board of Directors of the company"
      },
      {
        "key": "C",
        "text": "A lawyer with data protection specialization approved by the Board"
      },
      {
        "key": "D",
        "text": "A retired government official with data governance experience"
      }
    ],
    "correct": "B",
    "explanation": "Section 10(2)(a) specifies that the DPO must: represent the Significant Data Fiduciary under the Act, be based in India, be an individual responsible to the Board of Directors or similar governing body, and be the point of contact for grievance redressal. The requirement to be \"based in India\" and \"responsible to the Board of Directors\" are key accountability requirements.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-6",
    "source": "sector",
    "text": "A bank (Data Fiduciary) engages a marketing analytics firm (Data Processor) through a verbal agreement to process customer transaction data. Under Section 8(2), this arrangement is:",
    "options": [
      {
        "key": "A",
        "text": "Valid if the firm has a strong industry reputation"
      },
      {
        "key": "B",
        "text": "Invalid — a Data Processor can only be engaged under a valid written contract"
      },
      {
        "key": "C",
        "text": "Valid if the engagement is for less than 3 months"
      },
      {
        "key": "D",
        "text": "Valid if both parties sign a Non-Disclosure Agreement"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(2) explicitly states that a Data Fiduciary may engage a Data Processor only under a valid contract. A verbal agreement or informal arrangement does not constitute a valid contract for this purpose. The engagement without a valid contract violates Section 8(2) and undermines the bank's accountability framework.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-7",
    "source": "sector",
    "text": "A fintech company (Significant Data Fiduciary) completes its Data Protection Impact Assessment. Under Rule 13(2), the DPIA report must be furnished to the Board by:",
    "options": [
      {
        "key": "A",
        "text": "The Chief Data Officer of the company"
      },
      {
        "key": "B",
        "text": "The Data Protection Officer of the company"
      },
      {
        "key": "C",
        "text": "The person who carried out the DPIA and audit"
      },
      {
        "key": "D",
        "text": "The CEO of the company on behalf of the Board of Directors"
      }
    ],
    "correct": "C",
    "explanation": "Rule 13(2) requires the Significant Data Fiduciary to cause the person carrying out the Data Protection Impact Assessment and audit to furnish to the Board a report containing significant observations. This ensures independence — the assessor reports directly to the Board, not through company management, maintaining the integrity of the accountability mechanism.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-8",
    "source": "sector",
    "text": "A bank's customer grievance about data processing remains unresolved for 95 days. Under Rule 14(3), this is:",
    "options": [
      {
        "key": "A",
        "text": "Acceptable as banking grievances require thorough investigation"
      },
      {
        "key": "B",
        "text": "A violation — grievances must be resolved within a reasonable period not exceeding 90 days"
      },
      {
        "key": "C",
        "text": "Acceptable if the grievance involves a complex data breach"
      },
      {
        "key": "D",
        "text": "Acceptable if RBI's 120-day limit for banking grievances applies instead"
      }
    ],
    "correct": "B",
    "explanation": "Rule 14(3) requires every Data Fiduciary to have a grievance redressal system that resolves grievances within a reasonable period not exceeding ninety days. 95 days exceeds this limit. The bank must implement appropriate technical and organizational measures to ensure effectiveness of the system within the 90-day window.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-9",
    "source": "sector",
    "text": "An insurance company is being assessed for notification as a Significant Data Fiduciary. Which factor would NOT be considered by the Central Government under Section 10(1)?",
    "options": [
      {
        "key": "A",
        "text": "Volume and sensitivity of personal data processed"
      },
      {
        "key": "B",
        "text": "Risk to electoral democracy"
      },
      {
        "key": "C",
        "text": "The company's stock market listing status"
      },
      {
        "key": "D",
        "text": "Potential impact on sovereignty and integrity of India"
      }
    ],
    "correct": "C",
    "explanation": "Section 10(1) lists the factors for assessing Significant Data Fiduciary status: volume and sensitivity of data, risk to Data Principal rights, potential impact on sovereignty and integrity, risk to electoral democracy, security of the State, and public order. Stock market listing status is not a consideration — the assessment is based on data processing impact, not corporate structure.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-10",
    "source": "sector",
    "text": "Under Section 8(4), a bank's accountability obligation requires implementing:",
    "options": [
      {
        "key": "A",
        "text": "A dedicated DPDPA compliance department with 50+ employees"
      },
      {
        "key": "B",
        "text": "Appropriate technical and organisational measures to ensure effective observance of DPDPA"
      },
      {
        "key": "C",
        "text": "Board-level resolution approving DPDPA compliance annually"
      },
      {
        "key": "D",
        "text": "DPDPA compliance certification from a government-approved body"
      }
    ],
    "correct": "B",
    "explanation": "Section 8(4) requires a Data Fiduciary to implement appropriate technical and organisational measures to ensure effective observance of the Act and rules. This is a broad accountability obligation requiring systemic, proactive measures. The Act does not prescribe a specific number of employees, board resolutions, or certification requirements — the measures must be appropriate to the fiduciary's scale and risk.\n\n---"
  },
  {
    "principleNo": 9,
    "id": "sector-p9-11",
    "source": "sector",
    "text": "A bank's Data Protection Officer (DPO) reports a potential DPDPA violation to the bank's CEO who instructs the DPO not to report it to the Data Protection Board. Under DPDPA, the DPO's primary accountability is to:",
    "options": [
      {
        "key": "A",
        "text": "Follow the CEO's instructions as the CEO is the highest authority"
      },
      {
        "key": "B",
        "text": "The Board of Directors of the bank — the DPO is responsible to the governing body, not the CEO"
      },
      {
        "key": "C",
        "text": "The Reserve Bank of India as the banking regulator"
      },
      {
        "key": "D",
        "text": "The Ministry of Finance as the banking sector regulator"
      }
    ],
    "correct": "B",
    "explanation": "Section 10(2)(a)(iii) specifies that the DPO must be \"an individual responsible to the Board of Directors or similar governing body of the Significant Data Fiduciary.\" The DPO's accountability runs to the Board of Directors, not to the CEO or management. This independence ensures the DPO can report compliance issues without management pressure, maintaining accountability integrity.\n\n---\n\n---\n\n# QUICK REFERENCE — BANKING & INSURANCE SECTOR\n\n## Key Regulatory Touchpoints\n\n| DPDPA Requirement     | Banking Parallel                    | Insurance Parallel                     |\n| --------------------- | ----------------------------------- | -------------------------------------- |\n| Lawful Processing     | RBI KYC/AML mandates                | IRDAI policy data requirements         |\n| Notice & Transparency | Account opening disclosures         | Policy schedule disclosures            |\n| Consent               | Loan application consent            | Proposal form consent                  |\n| Purpose Limitation    | KYC data — only for KYC             | Mediclaim data — only for claims       |\n| Data Minimization     | Credit data — only necessary fields | Health data — only relevant conditions |\n| Data Accuracy         | Credit bureau reporting             | Policyholder records                   |\n| Storage Limitation    | RBI 10-year retention               | IRDAI 7-year retention                 |\n| Security & Integrity  | Core banking security               | Policy management system security      |\n| Accountability        | Board-level data governance         | CRO/DPO accountability                 |\n\n---\n\n## Penalty Reference\n\n| Violation                                         | Maximum Penalty |\n| ------------------------------------------------- | --------------- |\n| Failure of security safeguards — Section 8(5)     | ₹250 Crore      |\n| Failure to notify breach — Section 8(6)           | ₹200 Crore      |\n| Breach of children's data obligations — Section 9 | ₹200 Crore      |\n| Breach by Significant Data Fiduciary — Section 10 | ₹150 Crore      |\n| Data Principal duties breach — Section 15         | ₹10,000         |\n| Any other breach                                  | ₹50 Crore       |\n\n---\n\n## Sector-Specific Notes\n\n- **Banking:** RBI's Master Direction on KYC (2016) and PMLA obligations interact with DPDPA — legal obligations under these laws justify processing under Section 7(d)\n- **Insurance:** IRDAI's guidelines on data governance complement DPDPA — insurers must comply with both frameworks simultaneously\n- **NBFCs:** Subject to full DPDPA obligations; digital lending guidelines from RBI add additional data handling requirements\n- **Payment Aggregators:** PCI-DSS compliance for payment data must be read alongside DPDPA security obligations under Rule 6\n- **Fintech:** No regulatory carve-out — fully subject to DPDPA; innovative credit models must comply with data minimization\n\n---\n\n_Document prepared based on the Digital Personal Data Protection Act, 2023 (No. 22 of 2023) and Digital Personal Data Protection Rules, 2025 (notified on 13th November, 2025)_\n\n_Sector Focus: Banking, Insurance, NBFC, Fintech, Payment Aggregators_\n\n_Total: 9 Principles × 10 MCQs = 90 Sector-Specific Questions_"
  }
] as const satisfies readonly BankQuestion[];
