<ementa>

	<div class="ementa">
		<div class="header">{room().name} - {week().name}</div>
		<table>
			<tr>
				<th>Dia</th>
				<th>Almoço</th>
				<th>Lanche</th>
			</tr>
			<tr each="{day in week().ementa}" class="{highlight(day.name)}">
				<td>{day.name}</td>
				<td>
					<ul><li each="{line in day.almoco}">{line}</li></ul></td>
				<td><ul><li each="{line in day.lanche}">{line}</li></ul></td>
			</tr>			
		</table>
	</div>

		<script>

			room(){
				return opts[globalRoom]
			}

			week(){
				//calculate week
				var firstWeek = 29
				var currentWeek = moment().format("W")
				var weekNum = (currentWeek - firstWeek)%4 + 1

				if(weekNum > 0 && weekNum <= opts[globalRoom].semanas.length){
					return opts[globalRoom].semanas[weekNum-1]				
				}
				else {
					return []
				}
			}

			highlight(day){
				if(moment().format("ddd") === day){
					return "highlight"
				}
				else {
					return ""
				}
			}
		</script>
</ementa>
