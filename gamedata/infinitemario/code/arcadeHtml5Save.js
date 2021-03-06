/*
 * Common save file
 *
 * @SMF Arcade: html5 save type
 * @PHP-Quick-Arcade: ibp save type
 *
 */
function saveHtml5GameSmf(newhighscore, saveSystem, gamename="")
{
	var checkSessid = parent.document.getElementById("gameSmfToken") ? parent.document.getElementById("gameSmfToken") : (document.getElementById("gameSmfToken") ? document.getElementById("gameSmfToken") : "");
	window.myScoreTrig = typeof window.myScoreTrig == "undefined" ? 0 : window.myScoreTrig;

	if (window.myScoreTrig == 1)
		return false;

	window.myScoreTrig = 1;
	if (saveSystem == "smfhtml5" && checkSessid != "")
	{
		var gameSmfFullscreen = document.getElementById("gameSmfFullscreen") != undefined ? document.getElementById("gameSmfFullscreen").value : 0;
		if (parseInt(gameSmfFullscreen) == 1)
		{
			if (typeof newhighscore != "undefined")
			{
				var siteUrl = parent.document.getElementById("html5smfGameUrl");
				var sessid = document.getElementById("gameSmfToken");
				var gameForm = document.getElementById("gameForm");
				var vargamescore = document.createElement("INPUT");
				var vargamesessid = document.createElement("INPUT");
				vargamescore.type = "hidden";
				vargamescore.id = "score";
				vargamescore.name = "score";
				vargamescore.value = parseInt(newhighscore);
				gameForm.appendChild(vargamescore);
				vargamesessid.type = "hidden";
				vargamesessid.id = "gamesessid";
				vargamesessid.name = "gamesessid";
				vargamesessid.value = sessid.value;
				gameForm.appendChild(vargamesessid);
				setTimeout(gameForm.submit(), 1000);
				setTimeout(function(){ parent.window.location = siteUrl.split('#')[0] + "sa=highscore;#commentform3"; }, 3000);
				return true;
			}
			else
			{
				var noSmfScore = document.getElementById("noSmfScore").val ? document.getElementById("noSmfScore").val : "No score to save!";
				alert(noSmfScore);
				return false;
			}
		}
		else
		{
			if (typeof newhighscore != "undefined")
			{
				var siteUrl = parent.document.getElementById("html5smfGameUrl");
				var sessid = parent.document.getElementById("gameSmfToken");
				var gameForm = parent.document.getElementById("gameForm");
				var vargamescore = parent.document.createElement("INPUT");
				var vargamesessid = parent.document.createElement("INPUT");
				vargamescore.type = "hidden";
				vargamescore.id = "score";
				vargamescore.name = "score";
				vargamescore.value = parseInt(newhighscore);
				gameForm.appendChild(vargamescore);
				vargamesessid.type = "hidden";
				vargamesessid.id = "gamesessid";
				vargamesessid.name = "gamesessid";
				vargamesessid.value = sessid.value;
				gameForm.appendChild(vargamesessid);
				gameForm.submit();
				setTimeout(function(){ parent.window.location = siteUrl.split('#')[0] + "sa=highscore;#commentform3"; }, 3000);
				document.location.reload(true);
				return true;
			}
			else
			{
				var noSmfScore = parent.document.getElementById("noSmfScore").val ? parent.document.getElementById("noSmfScore").val : "No score to save!";
				alert(noSmfScore);
				return false;
			}
		}

		return false;
	}
	else
	{
		// IBP save system
		var gameFrameSrc = typeof window.frameElement.src != "undefined" ? window.frameElement.src : (parent.document.getElementById("game_name") ? parent.document.getElementById("game_name").value : "");
		var gnameQuery = gameFrameSrc.substr(gameFrameSrc.lastIndexOf('/') + 1);
		var gscore = newhighscore;
		var gname = gnameQuery != "" ? gnameQuery : gamename;
		var siteUrl = parent.window.location.href;
		var n = siteUrl.lastIndexOf("/");
		var newUrl = siteUrl.slice(0, n) + "/index.php?act=Arcade&do=newscore";
		var post_data = {'gname':gname, 'gscore':gscore};
		//send data using jQuery $.post()
		$.post(newUrl, post_data, function(data) {
			console.log("Saving score for " + gname);
			setTimeout(function(){ parent.window.location = siteUrl.split('#')[0]; }, 3000);
		}).fail(function(err) {
		});
	}
}
