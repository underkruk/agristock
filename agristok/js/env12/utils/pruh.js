/*! Copyright © 2015, 2016, 2017, 2018 Oracle and/or its affiliates. All rights reserved. */
/*v1.16.0.1*/
(function (window, undefined) {

	/*--------- Config Instances ---------*/
	var instances = {
		dev: { vcb: "https://vcbcs-dev.mvtresearch.com", ucb: "https://cb-dev.mvtresearch.com", editing: "https://static-dev.mvtresearch.com" },
		env12: { vcb: "https://vcbcs-env12.mvtresearch.com", ucb: "https://cb-env12.mvtresearch.com", editing: "https://static-env12.mvtresearch.com" },
		local: {ucb: "http://localhost:47302"}
	};
	/*--------- END Config Instances ---------*/

	var docReferrer = document.referrer,
		winLocation = window.location,
		origin = winLocation.protocol + "//" + winLocation.hostname + (winLocation.port ? ":" + winLocation.port : ""),
		loadedUtils=[];

	var instanceParamName = "mmInstance";
	var instanceKeyVcb = "mmVcbInstance";
	var instanceKeyUcb = "mmUcbInstance";
    var instanceKeyEditing = "mmEditingInstance";
    var versionParamName = "mm-lib-version";

	var allowedUtils = ["vcb", "ucb", "editing"];
	var utilitiesStartUp = {};

	var sessionStore = {
		get: function (name) {
			return sessionStorage.getItem(name);
		},
		set: function (name, value) {
			if (value === null || value === undefined) {
				sessionStorage.removeItem(name);
			} else {
				sessionStorage.setItem(name, value);
			}
		}
	};

	function select(arr, pred, isMany) {
		var res = [];
		for (var i in arr) {
			if (arr.hasOwnProperty(i)) {
				if (isMany)
					res = res.concat(pred(arr[i]));
				else
					res.push(pred(arr[i]));
			}
		}
		return res;
	}

	function where(arr, pred) {
		var res = [];
		for (var i in arr) {
			if (arr.hasOwnProperty(i) && pred(arr[i]))
				res.push(arr[i]);
		}
		return res;
	}

	function distinct(arr) {
		var u = {}, a = [];
		for (var i = 0, l = arr.length; i < l; ++i) {
			if (u.hasOwnProperty(arr[i])) {
				continue;
			}
			a.push(arr[i]);
			u[arr[i]] = 1;
		}
		return a;
	}

	function indexOf(arr, obj, start) {
		for (var i = (start || 0), j = arr.length; i < j; i++) {
			if (arr[i] === obj) {
				return i;
			}
		}
		return -1;
	}

	function paramsFromUri(uri) {
		var res = {};
		var matches = decodeURIComponent(uri || "").match(/([^=&?]+)=([^&#]+)/g) || [];
		for (var i = matches.length; i--;) {
			var match = matches[i].match(/([^=]+)=(.*)/);
			if (match) {
				res[match[1]] = match[2];
			}
		}
		return res;
	}

    function getValidatedVersion(version) {
        var validatedVersion = "latest";
        if (!version || version.trim() == "latest") {
        	return validatedVersion;
		}

        var matches = version.trim().match(/(\d){1,3}\.\d(\.\d)?/g) || [];
        if (matches.length > 0){
            validatedVersion = matches[0];
        }
        return validatedVersion;
    }

	function insertScript(url, isSync) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.charset = "utf-8";
		script.src = url;
		if (isSync) {
			document.write(script.outerHTML || new XMLSerializer().serializeToString(script));
		} else {
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	}

	function getInstanceUrlForTool(instanceName, toolName) {
		var instance = instances[instanceName];
		if (instance) {
			return instance[toolName];
		}
	}

	utilitiesStartUp["vcb"] = function (loader) {
		var startupPath = "/Content/Adjuster/Files/startup.js",
			utilName = "vcb",
			instanceKey = instanceKeyVcb,
			originsKey = "mmVcbOrigins",
			cid = "0",
			cookieStore = loader.baseStorage(utilName),
			instance, prevVcbOrigins;

		function shouldRunVcb() {
			var storageItem = sessionStore.get(instanceKey),
				storageFlag = !!storageItem,
				disabledFlag = storageItem === "disabled",
				cookieFlag = !!cookieStore.get(instanceKey),
				origins = cookieStore.get(originsKey) || "",
				existingOrigin = origins.indexOf(origin) > -1;
			return !disabledFlag && (cookieFlag && storageFlag && existingOrigin || cookieFlag && !existingOrigin);
		}

		function initMmcore() {
			window.mmcore = window.mmcore || {};
			mmcore.domain = loader.domain;
			mmcore.server = loader.srv;
			var destroy = mmcore._DestroyVcb,
				disable = mmcore._DisableVcb;
			mmcore._DestroyVcb = function () {
				var strategy = loader.baseStorage.storeStrategy.persistent,
					pruh = loader.getParam("pruh", strategy) || "";
				destroy && destroy();
				sessionStore.set(instanceKey, null);
				cookieStore.set(instanceKey, null);
				cookieStore.set(originsKey, null);
				pruh = pruh.replace(/,?\s*vcb/g, "").replace(/^\s*,\s*/g, "");
				if (!pruh) {
					loader.removeParam("pruh", strategy);
				} else {
					loader.setParam("pruh", pruh, strategy, 0);
				}
			};
			mmcore._DisableVcb = function () {
				disable && disable();
				sessionStore.set(instanceKey, "disabled");
			};
			mmcore._RestoreVcbOrigins = function () {
				prevVcbOrigins && sessionStore.set(originsKey, prevVcbOrigins);
			};
			mmcore.GetCookie = mmcore.GetCookie || function (name) {
					return cookieStore.get(name) || "";
				};
			mmcore.SetCookie = mmcore.SetCookie || function (name, value, expires) {
					cookieStore.set(name, value, expires);
				};
			mmcore.loader = loader;
		}

		if (/vcb/i.test(window["mmpruh"])) {
			if (self !== top && /mm-dlp-api/i.test(location.search) && /original-url/i.test(location.search)) {
				initMmcore();
			}
			return false;
		}

		if (docReferrer) {
			cid = paramsFromUri(docReferrer)["mode"] || "0";
			instance = paramsFromUri(docReferrer)[instanceParamName] || "";
			if (instance) {
				sessionStore.set(instanceKey, instance);
				cookieStore.set(instanceKey, instance);
				cookieStore.set(originsKey, origin);
			}
		}

		if (shouldRunVcb()) {
			var instanceUrl = getInstanceUrlForTool(cookieStore.get(instanceKey), utilName);
			if (instanceUrl) {
				initMmcore();
				var url = instanceUrl + startupPath + "?cid=" + cid;
				insertScript(url);
				var origins = cookieStore.get(originsKey) || "";
				prevVcbOrigins = origins;
				if (origins.indexOf(origin) === -1) {
					cookieStore.set(originsKey, origins + origin);
				}
				sessionStore.set(instanceKey, cookieStore.get(instanceKey));
				return false;
			}
		}

		return true;
	};

	utilitiesStartUp["ucb"] = function (loader) {
		if (window.UcbCore) {
			return false;
		}
		if(!window.mmproxy && window.self == window.top) {
			return true;
		}
		
		var startupPath = "/UCBLibrary/build/slave.js",
			utilName = "ucb",
			instanceKey = instanceKeyUcb,
			cookieStore = loader.baseStorage(utilName),
			instance;

		function destroyUcb() {
			cookieStore.set(instanceKey, null);
		}

		function initGlobals() {
			window.UcbCore = window.UcbCore || {};
			UcbCore.destroyUCB = destroyUcb;
			UcbCore.loader = loader;
		}

		if (docReferrer) {
			instance = paramsFromUri(docReferrer)[instanceParamName] || "";
			if (instance) {
				cookieStore.set(instanceKey, instance);
			}
		}

		var instanceUrl = getInstanceUrlForTool(cookieStore.get(instanceKey), utilName);
		if (instanceUrl) {
			var url = instanceUrl + startupPath;
			insertScript(url, !loader.async);
			initGlobals();
			return false;
		}
		return true;
	};

    utilitiesStartUp["editing"] = function (loader) {
		if (window.UcbCore) {
			return false;
		}
		if(!window.mmproxy && window.self == window.top) {
			return true;
		}
		
        var startupPath = "/data/editing-lib/{version}/slave.js",
            version = "latest",
            utilName = "editing",
            instanceKey = instanceKeyEditing,
            cookieStore = loader.baseStorage(utilName),
            instance,
			libraryVersion;

        function destroyEditingLib() {
            cookieStore.set(instanceKey, null);
        }

        function initGlobals() {
            window.UcbCore = window.UcbCore || {};
            UcbCore.destroyUCB = destroyEditingLib;
            UcbCore.loader = loader;
        }

        if (docReferrer) {
            instance = paramsFromUri(docReferrer)[instanceParamName] || "";
            if (instance) {
                cookieStore.set(instanceKey, instance);
            }
            libraryVersion = paramsFromUri(docReferrer)[versionParamName] || "";
            version = getValidatedVersion(libraryVersion);
        }

        startupPath = startupPath.replace("{version}", version);

        var instanceUrl = getInstanceUrlForTool(cookieStore.get(instanceKey), utilName);
        if (instanceUrl) {
            var url = instanceUrl + startupPath;
            insertScript(url, !loader.async);
            initGlobals();
            return false;
        }
        return true;
    };
	
	function runUtil(utilName, loader) {
		if (utilitiesStartUp[utilName]) {
			loadedUtils.push(utilName);
			return utilitiesStartUp[utilName](loader);
		}
		return true;
	}
		
	function Pruh(){
		this.isLoaded = true;
		this.getLoadedUtils = function(){
			return loadedUtils.slice(0);
		}
	}
	
	var pruhInit = function (loader, requestedUtils, resumeExecution) {
		if(window.mmsystem){
			window.mmsystem.pruh = new Pruh();
		}
		var utils = where(distinct(select(requestedUtils.split(","), function (s) {
			return s.toLowerCase().trim();
		})), function (w) {
			return indexOf(allowedUtils, w) >= 0;
		});
		loader.setParam("pruh", utils.join(","), loader.baseStorage.storeStrategy.persistent, 0);
		var resume = true;
		for (var i = 0; i < utils.length; i++) {
			resume &= runUtil(utils[i], loader);
		}
		if (resume) {
			resumeExecution();
		}
	};

	mmInitCallback(pruhInit);
})(window);