export let formEntries = [{
    id: 'bodypart',
    type: 'text',
    parent: 'bodypart',
    label: 'What is the body part affected?',
    options: ['Head/Neck', 'Shoulder', 'Elbow/Forearm', 'Wrist/Hand', 'Upper back', 'Lower back', 'Hip/Groin/Thigh', 'Knee/Shin', 'Foot/Ankle']
},
{
    id: 'radiodiagnosis',
    type: 'radio',
    parent: 'diagnosis',
    label: 'Do you know the diagnosis?',
    options: ['Yes', 'No']
},
{
    id: 'duration',
    type: 'text',
    parent: 'duration',
    label: 'How long have you had your problem for?',
    options: ['1-2 weeks', '3-12 weeks', '3-6 months', 'Over 6 months']
},
{
    id: 'offwork', 
    type: 'checkbox',
    parent: 'offwork',
    label: 'Are you currently off work because of this issue?',
    func: (event, setIsCheckedObject, isCheckedObject) => {const stateName = event.target.id
        setIsCheckedObject(prevState =>  ({...prevState, [stateName]: !prevState[stateName]}))
      
    }}
,
{
    id: 'offworkduration',
    type: 'text',
    label: 'For how long?',
    parent: 'offwork',
    options: ['1-2 weeks', '3-12 weeks', '3-6 months', 'Over 6 months']
},
{
    id: 'treatment',
    type: 'checkbox',
    parent: 'treatment',
    label: 'Are you currently receiving or have you received any treatment?',
    func: (event, setIsCheckedObject, isCheckedObject) => {const stateName = event.target.id
        setIsCheckedObject(prevState =>  ({...prevState, [stateName]: !prevState[stateName]}))
        console.log('state changed', isCheckedObject)
    }
},
{
    id: 'caremodality',
    type: 'text',
    parent: 'treatment',
    label: 'Who is it with?',
    options: ['Osteopath', 'Chiropractor', 'Physiotherapist', 'Massage', 'Alternative']
},
{
    id: 'careprovider',
    parent: 'treatment',
    type: 'radio',
    label: "and who provides it?",
    options: ['NHS', 'Private', 'Other']
},
{
    id: 'exercisecount',
    parent: 'treatment',
    type: 'text',
    label: 'How many exercises were you given to do?',
    options: ['1-3', '3-6', '6 or more', 'Multiple routines', 'None']
},
{
    id: 'apptfrequency',
    type: 'text',
    parent: 'treatment',
    label: 'How often do you see your therapist?',
    options: ['Once a week', 'Once every 2-3 weeks', 'Once every 3-6 weeks', 'More than 6 weeks between appointments', 'Only had 1 and got discharged']
},
{
    id: 'radioeducation',
    type: 'radio',
    parent: 'treatment',
    label: 'Have you been given/sent any educational content or information?',
    options: ['Yes', 'No']
}]