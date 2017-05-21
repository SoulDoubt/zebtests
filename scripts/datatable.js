// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {

    "use strict";

    // Create the defaults once
    var pluginName = "DataTable",
        defaults = {
            propertyName: "value",
            data: null,
            edit: false
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._selectedElement = null;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function() {


            if (this.settings.edit) {
                this.createBasicTable(this.settings.data);
            } else {
                this.createBasicTable(this.settings.data);
            }


        },

        toTitleCase: function(str) {
            return str.replace(/(?:^|\s)\w/g, function(match) {
                return match.toUpperCase();
            });
        },

        createEditForm: function(dataId) {
            var record = null;
            var self = this;

            $.each(self.settings.data, function(idx, val) {
                if (val.id == dataId) {
                    record = val;
                }
            });
            if (record) {
            	var $form = $("<div/>").addClass("form-horizontal");
                for (var prop in record){
                	var $group = $("<div/>").addClass("form-group");
                	var $lbl = $("<label/>").addClass("col-sm-2 control-label").text(this.toTitleCase(prop));
                	$group.append($lbl);
                	var value = record[prop];

                	if (typeof(value) === "string" || value instanceof String){
                		var $inpdiv = $("<div/>").addClass("col-sm-10");
                		var $inp = $("<input/>").addClass("form-control").val(value);
                		$inpdiv.append($inp);
                		$group.append($inpdiv);
                	}                	
                	$form.append($group);                	
                }
                $(this.element).find("#userEditForm").empty();
                $(this.element).find("#userEditForm").append($form);
            }
        },

        createBasicTable: function(data) {
            var self = this;
            var $tbl = $("<table/>").addClass("table table-bordered"),
                $hdr = $("<thead/>"),
                $bdy = $("<tbody/>"),
                $tr, $thr, $td;
            $thr = $("<tr/>");
            $hdr.append($thr);

            for (var prop in data[0]) {
                $thr.append($("<th/>").text(this.toTitleCase(prop)).addClass("text-center"));
            }

            $.each(data, function(idx, val) {
                $tr = $("<tr/>");
                $td = $("<td/>").text(val.id);
                $tr.append($td);
                $td = $("<td/>").text(val.name);
                $tr.append($td);
                $td = $("<td/>").text(val.permissions);
                $tr.append($td);
                $tr.attr("data-id", val.id);
                $bdy.append($tr);
            });

            $tbl.append($hdr);
            $tbl.append($bdy);
            var $editForm = $("<div/>").attr("id", "userEditForm");
            $(this.element).append($tbl);
            $(this.element).append($editForm);
            
            $tbl.find("tbody > tr").on("click", function(e) {
                if (self._selectedElement) {
                    self._selectedElement.removeClass("selectedTableRow");
                }
                self._selectedElement = $(e.currentTarget);
                self._selectedElement.addClass("selectedTableRow");

                var idd = self._selectedElement.attr("data-id");                
                if (self.settings.edit === true) {
                	console.log("edit");
                    self.createEditForm(idd);
                }
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
