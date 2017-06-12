
;
(function($, window, document, undefined) {

    "use strict";

    // Create the defaults once
    var pluginName = "DataTable",
        defaults = {
            propertyName: "value",
            data: null,
            edit: false,
            tableClasses: [],
            headerClasses: [],
            rowClasses: []
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

        getFormGroup: function(prop, value) {
            var fg = $("<div/>").addClass("form-group");
            var lbl = $("<label/>").attr("for", "inp_" + prop);
            var inp = $("<input/>").attr("type", "text").addClass("form-control");
            lbl.text(this.toTitleCase(prop));
            inp.val(value);
            fg.append(lbl);
            fg.append(inp);
            return fg;

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
                var mhead = $(".modal-header"),
                    mbody = $(".modal-body"),
                    mfoot = $(".modal-footer"),
                    mtitle = $(".modal-title");
                mtitle.text("Edit User: " + record.name);
                mbody.empty();
                var formGroups = [];
                for (var prop in record) {
                    console.log(prop);
                    var fg = self.getFormGroup(prop, record[prop]);
                    formGroups.push(fg);
                }

                if (formGroups.length <= 3) {
                    // lay them out in a single column;
                    $.each(formGroups, function(i, group) {
                        mbody.append(group);
                    });
                } else if (formGroups.length <= 4) {
                    // layout in 2 col-md-6s sid by side
                    // create the row and 2 columns
                    var drow = $("<div/>").addClass("row");
                    var dcol0 = $("<div/>").addClass("col-md-6");
                    var dcol1 = $("<div/>").addClass("col-md-6");
                    drow.append(dcol0, dcol1);
                    $.each(formGroups, function(i, fgroup) {
                        if (i % 2 == 0) {
                            dcol0.append(fgroup);
                        } else {
                            dcol1.append(fgroup);
                        }

                    });
                    mbody.append(drow);
                }

                $("#inputModal").modal();

            }
        },

        createBasicTable: function(data) {
            var self = this;

            var $tbl = $("<table/>"),
                $hdr = $("<thead/>"),
                $bdy = $("<tbody/>"),
                $tr, $td,
                $thr = $("<tr/>");

            if (self.settings.tableClasses.length > 0) {
                $tbl.addClass(self.settings.tableClasses.join(' '));
            } else {
                $tbl.addClass("table");
            }

            $hdr.append($thr);

            for (var prop in data[0]) {
                var thcell = $("<th/>").text(this.toTitleCase(prop));
                if (self.settings.headerClasses.length > 0) {
                    thcell.addClass(self.settings.headerClasses.join(' '));
                } else {
                    thcell.addClass("text-center");
                }
                $thr.append(thcell);
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

;

// the tree-view like component

(function($, window, document, undefined) {

    "use strict";

    // Create the defaults once
    var pluginName = "DataTree",
        defaults = {
            propertyName: "value",
            data: null,
            edit: false,
            tableClasses: [],
            headerClasses: [],
            rowClasses: []
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
