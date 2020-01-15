if (!localStorage.exesLocal)
{
	let exes = [];
	localStorage.setItem('exesLocal',JSON.stringify(exes))
}

function register()
{
	let exes = JSON.parse(localStorage.getItem('exesLocal'));
	let i = exes.length;

	if (localStorage.exesPosLocal)
	{
		i = localStorage.getItem('exesPosLocal');
		localStorage.removeItem('exesPosLocal');
	}

	exes[i] = new Exercise;
	console.log(exes[i]);

    $("#exe").val("");
    $("#rep").val("");
    $("#ser").val("");

	localStorage.setItem('exesLocal',JSON.stringify(exes));
	render();
}

function render()
{
	let exes = JSON.parse(localStorage.getItem('exesLocal'));

	$("#tabela tbody tr").remove();

	let calTotal = 0;
	let cal = 0;

	for (let p = 0; p < exes.length; p++)
	{
		//RENDER
		let total = parseInt(exes[p].rep * exes[p].ser);
		if (exes[p].exe == "Abdominal")
		{
			cal += 4 * total ;
		}else{
			if (exes[p].exe == "Flexão")
			{
				cal += 8 * total;
			}else{
				if (exes[p].exe == "Agachamento")
				{
					cal += 6.5 * total;
				}else{
					if (exes[p].exe == "Levantamento / braço")
					{
						cal += 7 * total;
					}else{
						if (exes[p].exe == "Levantamento / trapézio")
						{
							cal+=  4 * total;
						}
					}
				}
			}
		}

		let newRow = "<tr>";
			newRow += "<td>"+exes[p].date+"</td>";
			newRow += "<td>"+exes[p].exe+"</td>";
			newRow += "<td>"+exes[p].ser+"</td>";
			newRow += "<td>"+exes[p].rep+"</td>";

			
			newRow += "<td>"+total+"</td>"
			newRow += "<td><button type='button' onclick='del("+p+")'>X</button></td>"
			newRow += "<td><button type='button' onclick='edit("+p+")'>EDIT</button></td>"
			newRow += "</tr>"

		if (p < exes.length - 1)
		{
			if (exes[p].d != exes[p + 1].d)
			{
				cal = cal/10;
				newRow += "<td colspan='7'><span>&#10148;</span>"+(cal)+" cal. </td>";

				calTotal += cal;
				cal = 0;
			}
		}

		$("#tabela tbody").append(newRow);
	}

	let rowCal = "<td colspan='7'>TOTAL: "+calTotal+" cal.</td>";
	$("#tabela tbody").append(rowCal)
}

function del(p)
{
	let exes = JSON.parse(localStorage.getItem('exesLocal'));
	exes.splice(p, 1);
	localStorage.setItem('exesLocal',JSON.stringify(exes));
	render();
}

function edit(p)
{
	localStorage.setItem('exesPosLocal', p);
	let exes = JSON.parse(localStorage.getItem('exesLocal'));
	let exe = exes[p]

	$("#dia").val(exe.d);
    $("#mes").val(exe.m);
    $("#ano").val(exe.a);
    $("#exe").val(exe.exe);
    $("#rep").val(exe.rep);
    $("#ser").val(exe.ser);
}