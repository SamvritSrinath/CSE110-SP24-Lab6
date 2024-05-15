
describe('Notetaking App', () => {

    beforeAll(async () => {
        await page.goto('https://samvritsrinath.github.io/CSE110-SP24-Lab6/'); // Update URL as needed
    });

    it('Testing to see if button click adds a new note', async () => {
        // Click the "Add Note" button
        const adding_note_button = await page.$('.add-note');
        await adding_note_button.click();
        // Get the number of notes in the page
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        // Verify that 1 note is added
        expect(noteCount).toBe(1);
        // Verify that the default note value is set
        const noteContent = await page.$eval('.note', (note) => note.value);
        expect(noteContent).toBe(''); 
        // Verify placeholder is expected
        const notePlaceholder = await page.$eval('.note', (note) => note.placeholder);
        expect(notePlaceholder).toBe('New Note');
    }, 3500);

    it('Editing the existing note, should update the note to have \'Test Note\'', async () => {
        // Wait for the note input to appear
        const noteElement = await page.$('.note');
        await noteElement.click();
        // Get the textarea element for this note
        await page.type('.note','Test Note');
        // Click tab to save note
        await page.keyboard.press('Tab');
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note');
        // Verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(1);
    });

    it('Editing the already existing note after clicking tab, updating text to  add \'#1\'', async () => {
        // Click the note
        await page.click('.note');
        // Get the textarea element for this note
        const noteElement = await page.$('.note');
        // Type a new note into the input field
        await page.keyboard.type(' #1');
        // Click tab to save note
        await page.keyboard.press('Tab');
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note #1');
        //verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(1);
    });

    it('Adding another note with the existig one still there, editing text to  add \'Note #2\'', async () => {
        // Click the "Add Note" button
        const adding_note_button = await page.$('.add-note');
        await adding_note_button.click();
        // Get the number of notes in the page
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        // Verify that 1 note is added
        expect(noteCount).toBe(2);
        // Verify that the default note value is set
        const firstnoteContent = await page.$eval('.note', (note) => note.value);
        expect(firstnoteContent).toBe('Test Note #1'); 
        // Get the value of the second note
        const secondNoteContent = await page.$eval('.note:nth-of-type(2)', note => note.value);
        // Verify that the default note value is empty
        expect(secondNoteContent).toBe('');
        // Verify placeholder is expected
        const notePlaceholder = await page.$eval('.note', (note) => note.placeholder);
        expect(notePlaceholder).toBe('New Note');
        // Click the note
        await page.click('.note:nth-of-type(2)');
        // Get the textarea element for this note
        const noteElement = await page.$('.note:nth-of-type(2)');
        // Type a new note into the input field
        await page.keyboard.type('Test Note #2');
        // Click tab to save note
        await page.keyboard.press('Tab');
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note:nth-of-type(2)', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note #2');

        const notes = await page.$$('.note');
        //verify that there are two notes
        const noteCountAfter = notes.length;
        expect(noteCountAfter).toBe(2);
    }, 3500);

    it('Retains notes after refreshing page', async () => {
        console.log("REFRESHING PAGE");
        // Refresh page
        await page.reload();
        // Get the textarea element for this note
        const noteElement = await page.$('.note');
        // Get the text content of the note
        const firstNoteContent = await page.$eval('.note', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(firstNoteContent).toBe('Test Note #1');
        // Get the text content of the second note
        const secondNoteContent = await page.$eval('.note:nth-of-type(2)', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(secondNoteContent).toBe('Test Note #2');
        //verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(2);
    });

    it('Deleting the first note, should leave only the second note', async () => {
        console.log("DELETING First Note");
        // Click the note
        await page.click('.note',{clickCount:2});
        // Get the textarea element for this note
        const noteElement = await page.$$('.note');
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note #2');
        //verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(1);
    });

    it('Deleting the second note, should leave no notes', async () => {
        console.log("Deleting the second note, should leave no notes");
        // Click the note
        await page.click('.note',{clickCount:2});
        // Get the textarea element for this note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(0);
    });

    it('Creating multiple notes and modifying non-first note', async () => {
        console.log("Creating multiple notes and modifying non-first note");
        // Click the "Add Note" button
        const adding_note_button = await page.$('.add-note');
        for(let i = 0; i < 2; i++) {
            await adding_note_button.click();
        }
        // Get the number of notes in the page
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        // Verify that 3 notes are added
        expect(noteCount).toBe(2);
        // Verify that the default note value is set
        const notes = await page.$$('.note');
        for(note in notes){
            const noteContent = await page.$eval('.note', (note) => note.value);
            expect(noteContent).toBe('');
        }
        // Click all three notes
        const setNoteContent = ['TA', 'was here'];
        for(let i = 0; i < 2; i++) {
            await page.click(`.note:nth-of-type(${i+1})`);
            await page.type(`.note:nth-of-type(${i+1})`,setNoteContent[i]);
            await page.keyboard.press('Tab');
        }
        
        //modify the second note to say is the best
        await page.click('.note:nth-of-type(2)');
        for(let i = 0; i < 8; i++){
            await page.keyboard.press('Backspace');
        } //clears out was here
        await page.type('.note:nth-of-type(2)','is the best');
        await page.keyboard.press('Tab');

        
        // await page.click('.note:nth-of-type(2)');
        // await page.type('.note:nth-of-type(2)',' is the best');

        const expectedContent = ['TA', 'is the best'];
        for(let i = 0; i < 2; i++) {
            const noteContent = await page.$eval(`.note:nth-of-type(${i+1})`, (note) => note.value);
            expect(noteContent).toBe(expectedContent[i]);
        }

        //delete all notes
        for(let i = 0; i < 2; i++) {
            await page.click('.note',{clickCount:2});
        }

    }, 15000);


    it('Stress Testing Suite for creating and attempting to delete notes', async() => {
        const adding_note_button = await page.$('.add-note');
        console.log("Creating Notes");
        for(let i = 0; i < 3; i++) {
            await adding_note_button.click();
        }


        //Populate the notes
        await page.click('.note');
        await page.type('.note','Note 1');
        await page.keyboard.press('Tab');

        await page.click('.note:nth-of-type(2)');
        await page.type('.note:nth-of-type(2)','Note 2');
        await page.keyboard.press('Tab');

        await page.click('.note:nth-of-type(3)');
        await page.type('.note:nth-of-type(3)','Note 3');
        await page.keyboard.press('Tab');

        //at this step all notes are created

        //reload the page
        await page.reload();

        //verify the notes are still there
        const expectedNotes = ['Note 1', 'Note 2', 'Note 3'];
        const notes = await page.$$('.note');
        const noteCount = notes.length;
        //correct length all notes should be there
        expect(noteCount).toBe(3);

        //verify the content of the notes
        for (let i = 0; i < noteCount; i++) {
            
            const noteContent = await page.$eval(`.note:nth-of-type(${i + 1})`, (note) => note.value);
            console.log(noteContent);
            expect(noteContent).toBe(expectedNotes[i]);
        }

        console.log("DELETE NOTES");
        //delete third note
        await page.click('.note:nth-of-type(3)',{clickCount:2});
        //delete first note
        await page.click('.note',{clickCount:2});

        //expect only 1 note to be left
        const notesAfterDelete = await page.$$('.note');
        const noteCountAfterDelete = notesAfterDelete.length;
        expect(noteCountAfterDelete).toBe(1);

        //verify the content of the notes

        const expectedNotesAfterDelete = ['Note 2'];
        const noteContent = await page.$eval('.note', (note) => note.value);
        expect(noteContent).toBe(expectedNotesAfterDelete[0]);

        //delete the remaining notes
        await page.click('.note',{clickCount:2});

        //expect no notes to be left
        const notesAfterDeleteAll = await page.$$('.note');
        const noteCountAfterDeleteAll = notesAfterDeleteAll.length;
        expect(noteCountAfterDeleteAll).toBe(0);
    }, 10000);

});