<form method="post">
	<label for="category"></label>
	<fieldset>
		<legend>Category (win, Wipeout, wit):</legend>

		<div>
			<input type="radio" id="win" name="drone" value="win" checked />
			<label for="win">🏆 Win</label>
		</div>

		<div>
			<input type="radio" id="wit" name="drone" value="wit" />
			<label for="wit">🧠 Wit</label>
		</div>

		<div>
			<input type="radio" id="wipeout" name="drone" value="wipeout" />
			<label for="wipeout">💣 Wipeout</label>
		</div>
	</fieldset>
	<div>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" />
	</div>
	<div>
		<label for="description">Description</label>
		<textarea name="description" id="description"></textarea>
	</div>
	<div>
		<label for="reference">Reference</label>
		<input type="text" name="reference" id="reference" />
	</div>
	<div>
		<label for="tags">Tags</label>
		<input type="text" name="tags" id="tags" />
	</div>
	<button type="submit">Create</button>
</form>
