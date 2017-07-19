1. The description displayed in the skill’s detail card must contain accurate information so users are well informed on how to use the skill.

Please provide the information describing about the core functionality of the skill.

Please see test case 3.2 from our Submission Checklist for guidance on skill descriptions.

2. When attempting to invoke the skill with one of the example phrases the skill returns a non-contextualized response or error.  The example phrases must function without error since these are interactions that users are most likely to try.

Steps To Reproduce:

1. First example
User: "Alexa, ask austin improv for the hideout theater"
Skill: "There was a problem with the requested skill's response"

2. Third Example
User: "Alexa, ask austin improv for all listings"
Skill: "There was a problem with the requested skill's response"

Expected Result: It should give valid response.

Please see test case 3.1 from our Submission Checklist for guidance on example phrases.

3. When users make a request as instructed by the skill’s prompts, the skill response contains an error or is irrelevant to the request. Please make sure that all instructions contained in the skill’s prompts are supported utterances that return valid and relevant responses.

Steps To Reproduce:

User: "Alexa, open austin improv"
Skill: "You can ask me for all listings, listings for a specific theater, or, you can say exit ... What can I do for you?"
User: "for all listings"
Skill: "There was a problem with the requested skill's response"

Expected Result: It should give relevant response instead of error response.

Please see test case 4.3 from our Submission Checklist for guidance on intent responses.

4. When invoking one or more of the intent(s) with the slot value(s) provided, the skill’s response is irrelevant to the request or contains an error.

Steps To Reproduce:
1. for "ListingIntent" gives error response
ListingIntent

Expected Result: It should give valid response instead of error. Please note that the skill gives valid response for "coldtowne theater" slot value only, both in modal and one-shot requests. For all other slot values it is giving error response.

Please see test case 4.2 from our Submission Checklist for guidance on intent responses.

5. When invoking one or more of the intent(s) with an invalid or an empty slot value provided for one of the slots, the skill returns an error.

Steps To Reproduce:

1. "ListingIntent" for empty slot

User: "Alexa, open austin improv"
Skill: "You can ask me for all listings, listings for a specific theater, or, you can say exit ... What can I do for you?"
User: "for { }"
Skill: "There was a problem with the requested skill's response"

2. "ListingIntent" for invalid slot

User: "Alexa open austin improv"
Skill: "You can ask me for all listings, listings for a specific theater, or, you can say exit ... What can I do for you?"
User: "for {chocolate }"
Skill: "There was a problem with the requested skill's response"

Please see test case 4.11 from our Submission Checklist for guidance on error handling
